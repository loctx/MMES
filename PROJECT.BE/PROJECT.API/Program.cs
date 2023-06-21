﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Http.Features;
using PROJECT.API.Hubs;
using PROJECT.BUSINESS;
using System.Text.Json.Serialization;
using PROJECT.API.AppCode.Extensions;
using PROJECT.API.AppCode.Util;
using NLog;
using NLog.Extensions.Logging;

//LogManager.Setup().LoadConfigurationFromFile(Path.Combine(Directory.GetCurrentDirectory(), "nlog.config"));
var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.json", optional: true)
                .AddEnvironmentVariables().Build();
var logger = LogManager.Setup()
                       .LoadConfigurationFromSection(config)
                       .GetCurrentClassLogger();

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddControllers();
// Bắt lỗi model validation, dữ liệu đầu vào bị sai 
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            return ExceptionHandler.ExceptionValidationResult(context);
        };
    });

builder.Services.AddMvc();
builder.Services.AddHttpContextAccessor();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.SwaggerDoc("V1", new OpenApiInfo
    {
        Version = "V1",
        Title = "WebAPI",
        Description = "<a href='/log' target = '_blank'>Bấm vào đây để xem log file</a>",
    });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                }
            },
            new List < string > ()
        }
    });
});

builder.Services.Configure<JsonOptions>(options =>
{
    //options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddAuthentication(opt => {
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = ConfigurationManagerUtil.AppSetting["JWT:Issuer"],
        ValidAudience = ConfigurationManagerUtil.AppSetting["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManagerUtil.AppSetting["JWT:Key"]))
    };
});

builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});

builder.Services.AddSignalR();
builder.Services.AddMemoryCache();

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
        builder =>
        {
            builder.AllowAnyHeader()
                   .AllowAnyMethod()
                   .SetIsOriginAllowed((host) => true)
                   .AllowCredentials();
        }));

builder.Services.AddDIServices(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("/swagger/V1/swagger.json", "PROJECT WebAPI");
    });
}

//Truyền httpcontext vào trong TransferObject để lấy thông tin http request
TransferObjectExtension.SetHttpContextAccessor(app.Services.GetRequiredService<IHttpContextAccessor>());

//Cho phép đọc HttpRequest.Body nhiều lần
app.EnableRequestBodyRewind();

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseStaticFiles();

app.UseCors("CorsPolicy");
app.UseEndpoints(endpoints =>
{
   endpoints.MapHub<OnlineCountHub>("/UserOnline");
});

app.MapControllers();

app.Run();

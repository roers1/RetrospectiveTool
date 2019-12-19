using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Retrospective_Core.Services;
using Retrospective_EFSQLRetrospectiveDbImpl;
using Retrospective_EFSQLRetrospectiveDbImpl.Seeds;

namespace Retrospective_Back_End
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
	        services.AddCors(options =>
	        {
		        options.AddPolicy("CorsPolicy", builder => builder
			        .AllowAnyOrigin()
			        .AllowAnyMethod()
			        .AllowAnyHeader());
	        });
            _ = services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddMvc(option => option.EnableEndpointRouting = false);
            services.AddDbContext<RetroSpectiveDbContext>(options =>
	            options.UseSqlServer(
		            Configuration["Data:ConnectionString"]));
            services.AddTransient<IRetroRespectiveRepository, EFRetrospectiveRepository>();
            services.AddControllersWithViews().AddNewtonsoftJson(options =>options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider service)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
	            app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseMvc();
            SeedData.Initialize(service);
        }
    }
}

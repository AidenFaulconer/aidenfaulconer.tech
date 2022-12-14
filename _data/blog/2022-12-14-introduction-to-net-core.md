---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-14T01:00:23.034Z
title: Introduction to .NET core
metaDescription: Writing applications in .NET Core can be a powerful and
  efficient way to create web and desktop applications. In this blog, we'll
  cover some key concepts and techniques for writing .NET Core applications,
  including how to write a controller, how to secure your controllers, how to
  use configure services, how to configure startup.cs, and how to generate an
  API for your client-side using Swagger.
thumbnail: public/assets/me.png
---
<!--StartFragment-->

# BLOG: .net core, an introduction

Writing applications in .NET Core can be a powerful and efficient way to create web and desktop applications. In this blog, we'll cover some key concepts and techniques for writing .NET Core applications, including how to write a controller, how to secure your controllers, how to use configure services, how to configure startup.cs, and how to generate an API for your client-side using Swagger.

First, let's discuss what .NET Core is and why it's a great choice for building applications. .NET Core is an open-source, cross-platform framework for building applications. It is built on top of the popular .NET Framework and is designed to be lightweight and modular, allowing developers to easily create applications that can run on a variety of platforms, including Windows, Linux, and macOS.

One of the key components of a .NET Core application is the controller. A controller is a class that is responsible for handling HTTP requests and returning responses to the client. In .NET Core, controllers are typically derived from the **`Controller`** base class and are decorated with the **`[Controller]`** attribute.

Here's an example of a simple controller that returns a list of strings to the client:

```
[Controller]
public class MyController : Controller
{
    public IActionResult Index()
    {
        var values = new List<string>()
        {
            "value1",
            "value2",
            "value3"
        };
        return Ok(values);
    }
}
```

In this example, the **`MyController`** class derives from the **`Controller`** base class and is decorated with the **`[Controller]`** attribute. The **`Index`** method returns a list of strings to the client using the **`Ok`** method, which is provided by the **`Controller`** base class.

Securing your controllers is an important consideration when building .NET Core applications. There are many ways to secure your controllers, but one common approach is to use authentication and authorization.

Authentication is the process of verifying a user's identity, while authorization is the process of determining whether a user has permission to access a specific resource. In .NET Core, authentication and authorization can be implemented using the built-in **`IAuthenticationService`** and **`IAuthorizationService`** interfaces.

Here's an example of how you might use these interfaces to secure a controller:

```
[Controller]
public class MyController : Controller
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IAuthorizationService _authorizationService;

    public MyController(IAuthenticationService authenticationService, IAuthorizationService authorizationService)
    {
        _authenticationService = authenticationService;
        _authorizationService = authorizationService;
    }

    [Authorize]
    public IActionResult Index()
    {
        var values = new List<string>()
        {
            "value1",
            "value2",
            "value3"
        };
        return Ok(values);
    }
}
```

In this example, the **`MyController`** class is decorated with the **`[Authorize]`** attribute, which indicates that only authenticated users should be able to access the **`Index`** method. The **`IAuthenticationService`** and **`IAuthorizationService`** interfaces are injected into the constructor of the **`MyController`** class and are used to implement authentication and authorization checks.

Another important aspect of .NET Core applications is the **`ConfigureServices`** and `Startup.cs**`methods. The`**ConfigureServices**`method is where you can register services that your application will use, such as a database context, authentication service, or authorization service. The`**Startup.cs` method is where you can configure various aspects of your application, such as the middleware, routes, and options.

Here's an example of how you might use the **`ConfigureServices`** and **`Startup.cs`** methods in a .NET Core application:

```
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<MyDbContext>(options =>
        {
            options.UseSqlServer("connection-string-here");
        });

        services.AddIdentity<IdentityUser, IdentityRole>()
            .AddEntityFrameworkStores<MyDbContext>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "your-issuer",
                    ValidAudience = "your-audience",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-key-here"))
                };
            });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("AdminPolicy", policy => policy.RequireClaim("IsAdmin", "true"));
        });

        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();
        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}


```

In this example, the **`ConfigureServices`** method is used to register a database context, identity services, authentication services, and authorization services. The **`Configure`** method is used to configure the middleware, including the authentication and authorization middleware, as well as the routes and endpoints.

One common requirement for web applications is to implement two-factor authentication (TFA). In .NET Core, you can use the built-in **`Microsoft.AspNetCore.Authentication.AuthenticationScheme`** and **`Microsoft.AspNetCore.Identity.UserManager`** classes to implement TFA.

Here's an example of how you might use these classes to implement TFA in a .NET Core application:

```
public class TwoFactorAuthenticationController : Controller
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IAuthenticationSchemeProvider _schemeProvider;

    public TwoFactorAuthenticationController(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        
IAuthenticationSchemeProvider schemeProvider)
{
_userManager = userManager;
_signInManager = signInManager;
_schemeProvider = schemeProvider;
}

[HttpGet]
public async Task<IActionResult> EnableTwoFactorAuthentication()
{
    var user = await _userManager.GetUserAsync(User);
    if (user == null)
    {
        throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
    }

    var schemes = await _schemeProvider.GetAllSchemesAsync();
    var factorOptions = schemes.Where(x => x.DisplayName != null).Select(x => new SelectListItem { Text = x.DisplayName, Value = x.Name }).ToList();
    return View(new EnableTwoFactorAuthenticationViewModel { Providers = factorOptions });
}

[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> EnableTwoFactorAuthentication(EnableTwoFactorAuthenticationViewModel model)
{
    if (!ModelState.IsValid)
    {
        return View(model);
    }

    var user = await _userManager.GetUserAsync(User);
    if (user == null)
    {
        throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
    }

    var addAuthenticatorResult = await _userManager.SetTwoFactorEnabledAsync(user, true);
    if (!addAuthenticatorResult.Succeeded)
    {
        throw new ApplicationException($"Unexpected error occurred setting two-factor authentication for user with ID '{user.Id}'.");
    }

    // Generate the authenticator key and send it to the user
    var authenticatorKey = await _userManager.GetAuthenticatorKeyAsync(user);
    if (string.IsNullOrEmpty(authenticatorKey))
    {
        throw new ApplicationException($"Could not generate authenticator key for user with ID '{user.Id}'.");
    }

    // Send the authenticator key to the user via email or SMS, or any other method
    // ...

    return RedirectToAction(nameof(TwoFactorAuthentication));
}

}
```

In this example, the `TwoFactorAuthenticationController` class is used to implement the TFA functionality. The `EnableTwoFactorAuthentication` method is used to enable TFA for a given user, and the `TwoFactorAuthentication` method is used to verify the user's TFA code.

Finally, you may want to generate an API for your client-side application to use. One way to do this is to use Swagger, which is a popular framework for generating APIs. In .NET Core, you can use the `Microsoft.AspNetCore.Mvc.ApiExplorer` and `Swashbuckle.AspNetCore.SwaggerGen` packages to generate a Swagger API.

Here's an example of how you might use these packages to generate a Swagger API for your .NET Core application:

// ...

```
public class Startup
{
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc();
    services.AddApiVersioning(options =>
{
options.AssumeDefaultVersionWhenUnspecified = true;
options.ReportApiVersions = true;
options.DefaultApiVersion = new ApiVersion(1, 0);
});

services.AddVersionedApiExplorer(options =>
    {
        options.GroupNameFormat = "'v'VVV";
        options.SubstituteApiVersionInUrl = true;
    });

    services.AddSwaggerGen(options =>
    {
        var provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();
        foreach (var description in provider.ApiVersionDescriptions)
        {
            options.SwaggerDoc(description.GroupName, new OpenApiInfo
            {
                Title = $"API {description.ApiVersion}",
                Version = description.ApiVersion.ToString()
            });
        }
    });
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // ...

    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        var provider = app.ApplicationServices.GetService<IApiVersionDescriptionProvider>();
        foreach (var description in provider.ApiVersionDescriptions)
        {
            options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
        }
    });

    // ...
}
```

In this example, the `ConfigureServices` method is used to register the necessary services for generating a Swagger API, including the `ApiVersioning` and `SwaggerGen` services. The `Configure` method is used to configure the Swagger middleware, including the Swagger UI endpoint.

As you can see, .NET Core provides a powerful and flexible framework for building web and desktop applications. By following these examples and using the built-in classes and interfaces, you can quickly and easily create .NET Core applications that are secure, scalable, and maintainable.

One last thing to note is that, in order to use the Swagger API, you will need to add the **`Swagger`** attribute to your controllers. This attribute indicates that the controller's actions should be included in the Swagger documentation. Here's an example of how you might use the **`Swagger`** attribute:

```
[Controller]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[Swagger]
public class MyController : Controller
{
    // Controller actions go here...
}
```

In this example, the **`MyController`** class is decorated with the **`[Swagger]`** attribute, as well as the **`[ApiVersion]`** and **`[Route]`** attributes. This will ensure that the controller's actions are included in the generated Swagger documentation.

With these techniques and tools in your toolbox, you should be well-equipped to build robust and efficient .NET Core applications that can serve a variety of purposes and audiences. Happy coding!

Once you have generated a Swagger API for your .NET Core application, you can use that API to generate a TypeScript API for your client-side application. To do this, you can use a tool such as the open-source **`swagger-codegen-cli`** package.

To generate a TypeScript API, you will first need to install the **`swagger-codegen-cli`** package using the following command:

```
npm install -g swagger-codegen-cli
```

Once the package is installed, you can use the **`swagger-codegen`** command to generate a TypeScript API from your Swagger API. For example, the following command will generate a TypeScript API in the **`./api`** directory:

```
swagger-codegen generate -i http://localhost:5000/swagger/v1/swagger.json -l typescript-fetch -o ./api
```

In this command, the **`-i`** option specifies the input Swagger API, the **`-l`** option specifies the language (in this case, **`typescript-fetch`**), and the **`-o`** option specifies the output directory.

Once the TypeScript API has been generated, you can import it into your client-side application and use it to make API requests to your .NET Core application. Here's an example of how you might use the generated TypeScript API in your client-side application:

```
import { MyControllerApi, Configuration } from './api';

const api = new MyControllerApi();
const configuration = new Configuration({ basePath: 'http://localhost:5000' });

api.getValues(configuration)
    .then((response) => {
        // Do something with the response
    })
    .catch((error) => {
        // Handle the error
    });


```

In this example, the **`MyControllerApi`** class is imported from the generated TypeScript API, and an instance of this class is used to make a **`getValues`** request to the .NET Core application. The **`Configuration`** class is used to specify the base path of the API.

Using this technique, you can easily generate a TypeScript API for your client-side application, allowing you to easily integrate your client-side application with your .NET Core application.

<!--EndFragment-->
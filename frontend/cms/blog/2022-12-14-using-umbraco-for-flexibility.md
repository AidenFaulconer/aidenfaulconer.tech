---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-14T00:57:10.785Z
title: Using Umbraco for flexibility
metaDescription: Umbraco is a popular content management system (CMS) that is
  widely used by businesses and organizations around the world. It is known for
  its ease of use, flexibility, and powerful features, making it an excellent
  choice for those looking to manage and publish content on the web.
thumbnail: https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80
---
<!--StartFragment-->

# BLOG: using umbraco for flexibility

Umbraco is a popular content management system (CMS) that is widely used by businesses and organizations around the world. It is known for its ease of use, flexibility, and powerful features, making it an excellent choice for those looking to manage and publish content on the web.

One of the key benefits of using Umbraco is its ability to support complex content structures with ease. Using features like document types, the blocklist editor, and umbraco forms, you can create a well-structured and organized content hierarchy that is tailored to the specific needs of your business. This allows content editors to easily manage and update the content on your website, without the need for any technical expertise.

For example, let's say you have a website for a restaurant, and you want to create a page that lists the different dishes on your menu. Using Umbraco, you could create a "dishes" document type that includes fields for the dish name, ingredients, price, and a photo. You could then use the blocklist editor to create a "menu" page that displays all of the dishes in a structured and organized way.

To set up this structure in Umbraco, you would first need to create the "dishes" document type in the back-office of your website. This can be done by going to the "Settings" section and selecting "Document Types" from the left-hand menu. Click on the "Create" button and give your document type a name, such as "dishes."

Next, you will need to add the fields that you want to include in your document type. For our example, we will need fields for the dish name, ingredients, price, and photo. To add a field, click on the "Add" button and select the type of field you want to create, such as "Single-line Textbox" for the dish name, or "Multiple-line Textbox" for the ingredients. You can also add a "Media Picker" field for the photo, which will allow content editors to select an image from the media library.

Once you have created your fields, you can arrange them in the order you want using the drag-and-drop interface, and then save your document type. You can now create a new "menu" page on your website and use the blocklist editor to add a list of dishes to that page. To do this, click on the "Add" button in the blocklist editor, and then select the "dishes" document type from the list of options. This will add a new dish to your menu page, and you can repeat this process to add as many dishes as you like.

In addition to the blocklist editor, Umbraco also includes a powerful forms builder tool called "Umbraco Forms." This allows you to create custom forms on your website, such as contact forms, registration forms, or surveys. Using drag-and-drop, you can easily add fields to your form, such as textboxes, dropdown lists, checkboxes, and more. You can also customize the layout and design of your form to match the look and feel of your website.

In conclusion, Umbraco is a versatile and user-friendly CMS that offers a wide range of features and tools to help you manage and publish content on the web. Whether you are creating complex content structures, building custom forms, or simply updating your website, Umbraco makes it easy and efficient to get the job done.

As mentioned earlier, one of the key benefits of using Umbraco is its flexibility and the ability to tailor its features to the specific needs of your business. For example, if you are running an online store, you can use Umbraco to create a product catalog with detailed descriptions, prices, and photos for each item. You can also set up an e-commerce platform using Umbraco's built-in shopping cart and checkout system, which supports a wide range of payment gateways such as PayPal, Stripe, and SagePay.

Another important aspect of using Umbraco is its support for responsive design. This means that your website will automatically adjust its layout and styling to fit the screen size and device of your visitors, whether they are using a desktop computer, a tablet, or a smartphone. This ensures that your website provides a consistent and user-friendly experience across all devices, which is essential in today's mobile-first world.

Furthermore, Umbraco is also highly extensible and can be integrated with a wide range of third-party tools and services. For example, you can use Umbraco to integrate your website with popular marketing and analytics platforms such as Google Analytics, HubSpot, or MailChimp. You can also use Umbraco's API to connect your website to other systems and applications, such as customer relationship management (CRM) software or enterprise resource planning (ERP) systems.

In summary, Umbraco is a powerful and versatile CMS that offers a wide range of features and tools to help you manage and publish content on the web. Whether you are creating complex content structures, building custom forms, or integrating with third-party tools and services, Umbraco makes it easy and efficient to get the job done.

To help you get started with using Umbraco, let's take a look at some code examples that demonstrate some of its key features and capabilities.

First, let's create a simple document type in Umbraco that we can use to represent a blog post on our website. To do this, we can use the following code snippet, which defines a document type called "BlogPost"   that has fields for the post's title, body, and a publish date:

```
public class BlogPost : DocumentType
{
    [UmbracoProperty("Title")]
    public string Title { get; set; }

    [UmbracoProperty("Body")]
    public string Body { get; set; }

    [UmbracoProperty("Publish Date")]
    public DateTime PublishDate { get; set; }
}
```

Next, let's create a Razor view that we can use to display a list of blog posts on our website. This view will use the Umbraco API to fetch the list of blog posts from the content repository, and then render each post using the layout and styling that we have defined in our HTML templates:

```
@inherits Umbraco.Web.Mvc.UmbracoViewPage<IEnumerable<BlogPost>>

@foreach (var post in Model)
{
    <div class="blog-post">
        <h2>@post.Title</h2>
        <p>@post.Body</p>
        <p class="publish-date">@post.PublishDate</p>
    </div>
}
```

Finally, let's see how we can use Umbraco's built-in forms builder to create a custom contact form that our website visitors can use to send us messages and inquiries. To do this, we can use the following code snippet, which defines a form called "ContactUs" that has fields for the visitor's name, email, subject, and message:

```
@using Umbraco.Forms.Mvc
@using Umbraco.Forms.Web

@{
    var form = Model.Forms.FirstOrDefault(f => f.Name == "ContactUs");
    if (form == null)
    {
        <p>The contact form could not be found.</p>
    }
    else
    {
        using (Html.BeginUmbracoForm("ContactUs", "ContactUs", FormMethod.Post, new { @class = "contact-form" }))
        {
            @Html.AntiForgeryToken()

            <div class="form-group">
                @Html.LabelFor(f => f.Name, "Name")
                @Html.TextBoxFor(f => f.Name, new { @class = "form-control" })
            </div>

            <div class="form-group">
                @Html.LabelFor(f => f.Email, "Email")
                @Html.TextBoxFor(f => f.Email, new { @class = "form-control" })
            </div>

            <div class="form-group">
                @Html.LabelFor(f => f.Subject, "Subject")
                @Html.TextBoxFor(f => f.Subject, new { @class = "form-control" })
            </div>

            <div class="form-group

```

Welcome to our blog on Umbraco! In this post, we will be discussing the benefits of using Umbraco as a content management system (CMS) and how to set up a flexible and user-friendly structure for content editors.

First, let's talk about why Umbraco is a great CMS option. Umbraco is an open-source CMS that is built on the [ASP.NET](http://ASP.NET) framework, making it easy to integrate with other Microsoft technologies. It is also highly customizable and has a user-friendly interface that allows content editors to easily manage and update website content.

One of the key features of Umbraco is its use of "document types" to define the structure of your website's content. This allows you to create custom content types that can be used to create consistent and well-organized content on your website. For example, if you have a blog on your website, you can create a document type called "Blog Post" that includes fields for the post's title, author, and body text. This makes it easy for content editors to add new blog posts and ensures that the content is always displayed in a consistent format on the website.

In addition to document types, Umbraco also offers other features that can help you create a flexible and user-friendly structure for your content. For example, the "Block List" editor allows content editors to easily add and rearrange blocks of content on a page, such as images, videos, and text. This gives content editors the freedom to create unique and engaging pages without having to worry about HTML or CSS coding.

Another helpful feature of Umbraco is the "Umbraco Forms" module, which allows you to create custom forms for your website. This is useful for gathering information from website visitors, such as contact information or feedback on your products or services. Umbraco Forms makes it easy to create custom fields, set validation rules, and view and manage submitted data.

Overall, Umbraco is a powerful and user-friendly CMS that offers a wide range of features and customization options. By setting up a well-structured and flexible content management system, you can make it easier for content editors to manage your website and create engaging content for your audience.

Here is a simple example of how to set up a document type and use it to create a new blog post in Umbraco:

1. In the Umbraco backend, navigate to the "Settings" section and select "Document Types."
2. Click on the "Create" button to create a new document type.
3. In the "Info" tab, enter a name for your document type (e.g. "Blog Post") and a description.
4. In the "Structure" tab, add the fields that you want to include in your document type. For a blog post, you might want to include fields for the title, author, body text, and a featured image.
5. In the "Generic Properties" tab, you can set additional options for your document type, such as whether it should be allowed in the site's navigation or if it should be searchable.
6. Once you have saved your document type, you can create a new blog post by navigating to the "Content" section and selecting "Create" under the "Blog Post" document type.
7. Fill in the fields for your blog post and click "Save" to publish it on your website.

We hope this blog post has given you a better understanding of the benefits of using Umbraco as a CMS and how to set up a flexible and user-friendly structure for your website's content. If you're interested in

When it comes to building a website, choosing the right content management system (CMS) can be a daunting task. There are so many options out there, each with their own set of features and capabilities. One CMS that stands out from the rest is Umbraco.

Umbraco is an open-source CMS that is known for its flexibility and ease of use. It has a friendly user interface that allows content editors to quickly and easily create and manage their website's content. One of the standout features of Umbraco is the Block List editor, which allows content editors to build custom pages by dragging and dropping pre-defined content blocks. This means that content editors can create complex and unique pages without the need for any coding knowledge.

Another powerful feature of Umbraco is the ability to create custom document types. This allows developers to create a specific data structure for each type of content on the website. For example, a news article document type could have fields for the headline, author, and body text, while a product page document type could have fields for the product name, price, and description. This structure makes it easy for content editors to add and manage content, while ensuring that all content is consistently structured.

Umbraco also offers a variety of integrations, such as Umbraco Forms, which allows users to create custom forms for their website. This is a useful tool for gathering information from website visitors, such as contact details or feedback.

In conclusion, Umbraco is a powerful and flexible CMS that is well-suited to content-heavy websites. Its user-friendly interface, custom content blocks, and document types make it easy for content editors to manage their website's content, while its integrations allow for further customization and functionality. If you're looking for a CMS that offers a great balance of simplicity and power, then Umbraco is definitely worth considering.

<!--EndFragment-->
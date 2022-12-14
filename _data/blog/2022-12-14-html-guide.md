---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-14T04:33:23.964Z
title: HTML guide
metaDescription: HTML, or HyperText Markup Language, is the standard language
  used for creating and formatting the content and structure of web pages. It is
  a crucial tool for web developers and designers, as it allows them to add
  text, images, videos, and other media to web pages, and to specify how they
  should be displayed and organized.
thumbnail: public/assets/me.png
---
<!--StartFragment-->

HTML, or HyperText Markup Language, is the standard language used for creating and formatting the content and structure of web pages. It is a crucial tool for web developers and designers, as it allows them to add text, images, videos, and other media to web pages, and to specify how they should be displayed and organized.

To use HTML, you need a text editor or an Integrated Development Environment (IDE), such as Notepad, Sublime Text, or Visual Studio Code. You can use these tools to create a new HTML document, or to edit an existing one. To create a basic HTML page, you need to start with the **`<html>`** tag, which defines the start of an HTML document. Then, you need to add the **`<head>`** and **`<body>`** tags, which define the head and body sections of the HTML page, respectively.

Here is an example of a simple HTML page:

```
<html>
  <head>
    <title>My First HTML Page</title>
  </head>
  <body>
    <h1>Welcome to My First HTML Page</h1>
    <p>This is a simple page that I created using HTML.</p>
    <ul>
      <li>HTML allows me to add text, images, and other media to my page.</li>
      <li>HTML uses tags and attributes to define the elements of a page.</li>
      <li>HTML is simple and easy-to-learn, and it is the building block of the World Wide Web.</li>
    </ul>
  </body>
</html>


```

In the **`<head>`** section, you can add metadata, such as the title of the page, the author, the keywords, and the styles and scripts that you want to use. In the **`<body>`** section, you can add the content of the page, such as text, images, videos, and other media. To format

HTML, or HyperText Markup Language, is the standard language used for creating and formatting the content and structure of web pages. It is a crucial tool for web developers and designers, as it allows them to add text, images, videos, and other media to web pages, and to specify how they should be displayed and organized.

HTML is a simple and easy-to-learn language, and it is the building block of the World Wide Web. It uses a system of tags and attributes to define the different elements of a web page, such as headings, paragraphs, lists, links, and more. These tags and attributes are written in plain text, and they are interpreted by web browsers to display the content of a web page in a visual and interactive format.

To use HTML, you need a text editor or an Integrated Development Environment (IDE), such as Notepad, Sublime Text, or Visual Studio Code. You can use these tools to create a new HTML document, or to edit an existing one. To create a basic HTML page, you need to start with the **`<html>`** tag, which defines the start of an HTML document. Then, you need to add the **`<head>`** and **`<body>`** tags, which define the head and body sections of the HTML page, respectively.

In the **`<head>`** section, you can add metadata, such as the title of the page, the author, the keywords, and the styles and scripts that you want to use. In the **`<body>`** section, you can add the content of the page, such as text, images, videos, and other media. To format and organize the content, you can use various HTML tags and attributes, such as **`<h1>`** for headings, **`<p>`** for paragraphs, **`<ul>`** for unordered lists, **`<a>`** for links, and more.

To apply HTML in making websites, you need to follow some best practices and guidelines, such as using semantic HTML tags to add meaning and structure to your content, using CSS to control the appearance and layout of your page, and using JavaScript to add interactivity and dynamic features to your page. You also need to consider the user experience and accessibility of your website, and to test and optimize your page for different devices, browsers, and screen sizes.

In conclusion, HTML is a powerful and essential tool for creating and formatting the content and structure of web pages. It is simple and easy-to-learn, and it allows web developers and designers to add text, images, videos, and other media to web pages, and to specify how they should be displayed and organized. By following best practices and guidelines, you can use HTML to create effective and engaging websites that provide a positive user experience and accessibility.

- - -

HTML is a markup language that is used to structure and format web pages. It allows you to create elements, such as headings, paragraphs, lists, and links, and add attributes, such as classes, IDs, and styles, to these elements. By using HTML, you can create the content and layout of your web pages, and make them more accessible, interactive, and semantic.

In this blog post, we will cover the basics of HTML, and show you how to create your first HTML page.

## **Getting started**

To create an HTML page, you will need a text editor, such as Notepad, Sublime Text, or Visual Studio Code, and a web browser, such as Google Chrome, Mozilla Firefox, or Microsoft Edge.

To create your first HTML page, open your text editor and create a new file called **`index.html`**. This will be the main page of your website, and it will contain the HTML code that defines the structure and content of your page.

To start writing your HTML code, you need to add the **`<!DOCTYPE html>`** declaration at the top of your **`index.html`** file. This tells the web browser that your page is written in HTML5, the latest version of the HTML standard.

```
<!DOCTYPE html>


```

Next, you need to add the **`<html>`** element, which is the root element of your HTML page. This element wraps all the other elements on your page, and it has two attributes: the **`lang`** attribute, which specifies the language of your page, and the **`dir`** attribute, which specifies the text direction of your page.

```
<!DOCTYPE html>
<html lang="en" dir="ltr">

</html>
```

Inside the **`<html>`** element, you need to add the **`<head>`** and **`<body>`** elements. The **`<head>`** element contains metadata about your page, such as the title, the charset, the stylesheets, and the scripts. The **`<body>`** element contains the main content of your page, such as the headings, paragraphs, lists, and links.

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>

  </head>
  <body>

  </body>
</html>
```

## **Creating elements**

To create elements on your HTML page, you need to use HTML tags. A tag is a pair of angle brackets, **`<>`**, that surrounds the element's name. For example, the **`<h1>`** tag creates a level 1 heading, the **`<p>`** tag creates a paragraph, the **`<ul>`** tag creates an unordered list, and the **`<a>`** tag creates a

To add attributes to your HTML elements, you need to use the **`<element>`** syntax, and place the attribute inside the angle brackets, followed by an equals sign **`=`**, and the attribute value inside double or single quotes. For example, the **`<h1 id="main-heading">`** element creates a level 1 heading with an **`id`** attribute that has a value of **`main-heading`**, and the **`<a href="<https://google.com>">`** element creates a link with an **`href`** attribute that has a value of **`https://google.com`**.

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>

  </head>
  <body>
    <h1 id="main-heading">My first HTML page</h1>
    <p>Welcome to my first HTML page. This page is created using HTML tags and attributes.</p>
    <ul>
      <li><a href="https://google.com">Google</a></li>
      <li><a href="https://bing.com">Bing</a></li>
      <li><a href="https://yahoo.com">Yahoo</a></li>
    </ul>
  </body>
</html>
```

## **Adding styles**

To add styles to your HTML elements, you can use the **`style`** attribute, and specify the CSS rules that you want to apply to the element. For example, the **`<h1 style="color: red;">`** element creates a level 1 heading with a **`color`** property that has a value of **`red`**, and the **`<p style="font-size: 16px;">`** element creates a paragraph with a **`font-size`** property that has a value of **`16px`**.

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>

  </head>
  <body>
    <h1 style="color: red;">My first HTML page</h1>
    <p style="font-size: 16px;">Welcome to my first HTML page. This page is created using HTML tags and attributes.</p>
    <ul>
      <li><a href="https://google.com">Google</a></li>
      <li><a href="https://bing.com">Bing</a></li>
      <li><a href="https://yahoo.com">Yahoo</a></li>
    </ul>
  </body>
</html>
```

Alternatively, you can use the **`class`** attribute, and specify the CSS class that you want to apply to the element. For example, the **`<h1 class="main-heading">`** element creates a level 1 heading with a **`class`** attribute that has a value of **`main-heading`**, and the **`<p class="welcome-message">`** element creates a paragraph with a **`class`** attribute that has a value of **`welcome-message`**.

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>

  </head>
  <body>
    <h1 class="main-heading">My first HTML page</h1>
    <p class="welcome-message">Welcome to my first HTML page. This page is created using HTML tags and attributes.</p>
    <ul>
      <li><a href="https://google.com">Google</a></li>
      <li><a href="https://bing.com">Bing</a></li>
      <li><a href="https://yahoo.com">Yahoo</a></li>
    </ul>
  </body>
</html>
```

To define the CSS classes that you want to use in your HTML page, you need to add the **`<style>`** element inside the **`<head>`** element. This element contains the CSS rules that you want to apply to your elements, and it uses the **`.classname`** selector to target the elements with the specified class attribute.

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <style>
      .main-heading {
        color: red;
      }
      .welcome-message {
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <h1 class="main-heading">My first HTML page</h1>
    <p class="welcome-message">Welcome to my first HTML page. This page is created using HTML tags and attributes.</p>
    <ul>
      <li><a href="https://google.com">Google</a></li>
      <li><a href="https://bing.com">Bing</a></li>
      <li><a href="https://yahoo.com">Yahoo</a></li>
    </ul>
  </body>
</html>
```

## **Adding scripts**

To add scripts to your HTML page, you can use the **`<script>`** element inside the **`<head>`** or **`<body>`** elements. This element contains the JavaScript code that you want to execute on your page, and it allows you to add interactivity,

<!--EndFragment-->
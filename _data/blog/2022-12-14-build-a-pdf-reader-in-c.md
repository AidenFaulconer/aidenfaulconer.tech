---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-14T00:37:46.361Z
title: Build a PDF reader in c++
metaDescription: C++ is a popular, high-performance programming language that is
  widely used for building large-scale applications. C++ is known for its
  efficiency, flexibility, and control, and it offers a rich set of features and
  libraries for developing complex and performance-critical applications.
thumbnail: public/assets/me.png
---
<!--StartFragment-->

Introduction to C++

C++ is a popular, high-performance programming language that is widely used for building large-scale applications. C++ is known for its efficiency, flexibility, and control, and it offers a rich set of features and libraries for developing complex and performance-critical applications.

In this tutorial, we will learn the basics of C++, and we will use it to build a parallel and multi-threaded PDF reader.

Getting Started

To follow along with this tutorial, you will need a computer with a C++ compiler installed. You can download and install a C++ compiler from the official website at [](https://isocpp.org/)**<https://isocpp.org/>**.

Once you have a C++ compiler installed, you can verify that it is working correctly by creating a new file with the following code:

```
#include <iostream>int main()
{
    std::cout << "Hello, world!" << std::endl;
    return 0;
}
```

Save this file as **`hello.cpp`**, and then compile it using the following command:

```
g++ hello.cpp -o hello
```

This will compile the **`hello.cpp`** file and create an executable file named **`hello`**. To run the program, you can use the following command:

```
./hello
```

This will execute the **`hello`** program and print "Hello, world!" to the screen.

Variables and Data Types

In C++, a variable is a named storage location for a value. Variables are used to store data and manipulate it in programs.

To create a variable in C++, you use the **`auto`** keyword, like this:

```
auto x = 5;
```

This creates a variable named **`x`** and assigns it the value **`5`**. The **`auto`** keyword automatically determines the type of the variable based on the value that is assigned to it.

In C++, there are several built-in data types that you can use to store different types of data. Here are some examples of C++ data types:

* **`int`**: This data type is used to store integers (whole numbers), such as **`1`**, **`2`**, **`3`**, etc.
* **`double`**: This data type is used to store floating-point numbers (numbers with decimal points), such as **`1.0`**, **`2.5`**, **`3.14`**, etc.
* **`char`**: This data type is used to store characters (single letters or symbols), such as **`'a'`**, **`'b'`**, **`'c'`**, etc.
* **`string`**: This data type is used to store strings (sequences of characters), such as **`"hello"`**, **`"world"`**, etc.

Functions

In C++, a function is a block of code that performs a specific task. Functions are used to modularize and organize code, and they can be called and reused in different parts of a program.

To create a function in C++, you use the **`function`** keyword, like this:

```
function hello()
{
    std::cout << "Hello, world!" << std::endl;
}
```

This defines a function named **`hello`** that prints the message "Hello, world!" to the screen. To call this function, you use its name followed by parentheses, like this:

```
hello();
```

This will execute the code inside the **`hello`** function and print "Hello, world!" to the screen.

In C++, you can also define functions that take arguments (inputs) and return values (outputs). For example, the following function takes two **`int`** arguments and returns their sum:

```
int sum(int x, int y)
{
    return x + y;
}
```

To call this function and use its return value, you can use the following code:

```
int result = sum(2, 3);
std::cout << result << std::endl;  // prints 5
```

Classes and Objects

In C++, a class is a template for creating objects. Classes are used to model real-world entities and their properties and behaviors.

To create a class in C++, you use the **`class`** keyword, like this:

```
class Dog
{
public:
    int age;
    string name;

    void bark()
    {
        std::cout << "Woof!" << std::endl;
    }
};
```

This defines a class named **`Dog`** that has two attributes (**`age`** and **`name`**) and one method (**`bark`**). The **`public`** keyword indicates that these members are accessible from outside the class.

To create an object from a class, you use the **`class name`** followed by parentheses, like this:

```
Dog my_dog;
```

This creates an object named **`my_dog`** that is an instance of the **`Dog`** class.

To access the attributes and methods of an object, you use the **`.`** operator, like this:

```
my_dog.age = 3;
my_dog.name = "Buddy";
std::cout << my_dog.name << std::endl;  // prints "Buddy"
my_dog.bark();  // prints "Woof!"
```

Building a Parallel and Multi-Threaded PDF Reader

Now that we have learned the basics of C++, we can use it to build a parallel and multi-threaded PDF reader.

To do this, we will need to use the **`PDFium`** library, which provides a C++ interface to the PDF file format. To install this library, you can follow the instructions on the official website at [](https://pdfium.googlesource.com/)**<https://pdfium.googlesource.com/>**

Once the **`PDFium`** library is installed, you can use it to open and parse PDF files in your C++ program.

To use the **`PDFium`** library, you need to include the following header files in your C++ code:

```
#include <fpdfview.h>#include <fpdf_text.h>
```

These header files provide the declarations and definitions for the **`PDFium`** functions and classes that you will use in your program.

Next, we need to create a class for our PDF reader. This class will use the **`PDFium`** library to open and parse PDF files, and it will use multiple threads to read and process the PDF pages in parallel.

Here is the code for our PDF reader class:

Copy code

This `PDFReader` class has three methods:

* The `get_num_pages` method returns the number of pages in the PDF file.
* The `get_text` method takes a page number and returns the text on that page.
* The `~PDFReader` method is the destructor, which is called when the `PDFReader` object is destroyed. It closes the PDF document and frees the memory that was allocated for it.

To use this class, you can create an instance of the `PDFReader` class and pass it the filename of the PDF file that you want to read. Then, you can use the `get_num_pages` and `get_text` methods to access the contents of the PDF file.

Here is an example of how to use the `PDFReader` class:

```
class PDFReader
{
public:
    string filename;
    FPDF_DOCUMENT document;

    PDFReader(string filename)
    {
        this->filename = filename;
        this->document = FPDF_LoadDocument(filename.c_str(), nullptr);
    }

    int get_num_pages()
    {
        return FPDF_GetPageCount(this->document);
    }

    string get_text(int page_num)
    {
        FPDF_PAGE page = FPDF_LoadPage(this->document, page_num);
        FPDF_TEXTPAGE text_page = FPDF_LoadTextPage(this->document, page_num);

        char buffer[1024];
        int len = FPDFText_GetText(text_page, 0, -1, buffer, sizeof(buffer));
        string text = string(buffer,
len);

Copy code
    FPDFText_ClosePage(text_page);
    FPDF_ClosePage(page);
    return text;
}

~PDFReader()
{
    FPDF_CloseDocument(this->document);
}
};



PDFReader reader("my_file.pdf");
int num_pages = reader.get_num_pages();

for (int i = 0; i < num_pages; i++)
{
string text = reader.get_text(i);
std::cout << text << std::endl;
}

Copy code

This code creates an instance of the `PDFReader` class and passes it the filename of the PDF file. It then uses the `get_num_pages` method to get the number of pages in the PDF file and loops over the pages to print the text on each page.

To make our PDF reader parallel and multi-threaded, we can use the `std::thread` class from the C++ Standard Library. This class allows us to create and manage multiple threads in our program.

Here is an example of how to use the `std::thread` class:

#include <thread>

void print_hello()
{
std::cout << "Hello, world!" << std::endl;
}

int main()
{
std::thread t(print_hello);
t.join();
return 0;
}

Copy code

This code creates a `std::thread` object named `t` and passes it the `print_hello` function. This will create a new thread that runs the `print_hello` function in parallel with the main thread. The `join` method waits for the thread to finish and then returns control to the main thread.

To use multiple threads
```

in our PDF reader, we can create one thread for each page in the PDF file and use each thread to extract the text from that page. Then, we can use the **`join`** method to wait for all the threads to finish before printing the results.

Here is the updated code for our **`PDFReader`** class that uses multiple threads to extract the text from each page:

```
class PDFReader
{
public:
    string filename;
    FPDF_DOCUMENT document;
    vector<string> pages;

    PDFReader(string filename)
    {
        this->filename = filename;
        this->document = FPDF_LoadDocument(filename.c_str(), nullptr);
        int num_pages = FPDF_GetPageCount(this->document);

        vector<std::thread> threads;
        for (int i = 0; i < num_pages; i++)
        {
            threads.push_back(std::thread(&PDFReader::extract_page, this, i));
        }

        for (auto& thread : threads)
        {
            thread.join();
        }
    }

    int get_num_pages()
    {
        return this->pages.size();
    }

    string get_text(int page_num)
    {
        return this->pages[page_num];
    }

    ~PDFReader()
    {
        FPDF_CloseDocument(this->document);
    }

private:
    void extract_page(int page_num)
    {
        FPDF_PAGE page = FPDF_LoadPage(this->document, page_num);
        FPDF_TEXTPAGE text_page = FPDF_LoadTextPage(this->document, page_num);

        char buffer[1024];
        int len = FPDFText_GetText(text_page, 0, -1, buffer, sizeof(buffer));
        string text = string(buffer, len);
        this->pages.push_back(text);

        FPDFText_ClosePage(text_page);
        FPDF_ClosePage(page);
    }
};


```

In this updated code, the **`PDFReader`** class has a new **`pages`** attribute that is a vector of strings, where each string is the text on a PDF page. The constructor of the **`PDFReader`** class creates one thread for each page and uses the **`extract_page`** method to extract the text from that page. The `

**`extract_page`** method uses the **`PDFium`** library to load the PDF page and extract the text from it. It then adds the text to the **`pages`** vector.

The **`get_text`** method now simply returns the text from the **`pages`** vector at the specified page number.

With this updated **`PDFReader`** class, we can now use multiple threads to read and process the PDF pages in parallel. This will improve the performance of our PDF reader and make it more efficient.

Here is an example of how to use the updated **`PDFReader`** class:

```
PDFReader reader("my_file.pdf");
int num_pages = reader.get_num_pages();

for (int i = 0; i < num_pages; i++)
{
    string text = reader.get_text(i);
    std::cout << text << std::endl;
}


```

This code creates an instance of the **`PDFReader`** class and passes it the filename of the PDF file. It then uses the **`get_num_pages`** method to get the number of pages in the PDF file and loops over the pages to print the text on each page.

With this code, we have created a parallel and multi-threaded PDF reader in C++ using the **`PDFium`** library and the **`std::thread`** class from the C++ Standard Library. This PDF reader is efficient and can read and process large PDF files quickly and effectively.

<!--EndFragment-->
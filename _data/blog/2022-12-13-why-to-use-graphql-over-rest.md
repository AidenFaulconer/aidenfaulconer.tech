---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-13T23:49:17.932Z
title: Why to use GraphQL over REST
metaDescription: GraphQL is a query language and runtime for APIs that provides
  a more flexible and efficient way of accessing and modifying data than
  traditional REST APIs. In this blog post, we will take a look at why you would
  want to use GraphQL over traditional REST endpoints, with code examples in a
  React application.
thumbnail: public/assets/me.png
---
GraphQL is a query language and runtime for APIs that provides a more flexible and efficient way of accessing and modifying data than traditional REST APIs. In this blog post, we will take a look at why you would want to use GraphQL over traditional REST endpoints, with code examples in a React application.

One of the main advantages of using GraphQL over traditional REST endpoints is that it allows you to retrieve only the data that you need from the API. With REST APIs, you often have to make multiple requests to different endpoints to get all of the data that you need, which can be inefficient and slow. With GraphQL, you can specify exactly which data you want to retrieve in a single request, and the API will return the data in a predictable and structured format.

For example, suppose you have a REST API with the following endpoints:

* **`/products`**: returns a list of products
* **`/products/:id`**: returns the details of a specific product
* **`/products/:id/reviews`**: returns the reviews for a specific product

To get the details and reviews for a specific product, you would have to make two separate requests to the **`/products/:id`** and **`/products/:id/reviews`** endpoints. With GraphQL, you can make a single request that specifies the data that you want to retrieve, like this:

```

```

This GraphQL query will retrieve the details and reviews for the product with the ID "123" in a single request. The response will be in a predictable and structured format, making it easier to work with the data in your application.

Another advantage of using GraphQL is that it allows you to modify data using mutations. With REST APIs, you often have to make separate requests to different endpoints to create, update, or delete data. With GraphQL, you can specify the data that you want to modify in a single request, and the API will handle the update or delete operation for you.

For example, suppose you have a REST API with the following endpoints:

* **`POST /products`**: creates a new product
* **`PUT /products/:id`**: updates an existing product
* **`DELETE /products/:id`**: deletes an existing product

To create, update, or delete a product, you would have to make separate

requests to the appropriate endpoint with the data that you want to modify. With GraphQL, you can make a single request that specifies the data that you want to modify, like this:

```

```

This GraphQL mutation will create a new product with the specified data in a single request. The response will include the ID of the newly created product, as well as the other data that you specified in the mutation.

In a React application, you can use the **`graphql`** higher-order component from the **`react-apollo`** library to make GraphQL queries and mutations. This component will automatically handle the request and response, and provide the data to your component as props.

For example, here is how you can make a GraphQL query in a React component:

```

```

const PRODUCTS_QUERY = gql **`{ products { id name } }`**;

export default graphql(PRODUCTS_QUERY)(Products);

```

```

import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const CreateProduct = ({ mutate }) => {
const handleSubmit = event => {
event.preventDefault();

```

```

};

return (

<form onSubmit={handleSubmit}>
<input name="name" type="text" placeholder="Product name" />
<input name="description" type="text" placeholder="Product description" />
<input name="price" type="number" placeholder="Product price" />
<button type="submit">Create product</button>
</form>
);
};

const CREATE_PRODUCT_MUTATION = gql **`mutation createProduct($name: String!, $description: String!, $price: Float!) { createProduct(name: $name, description: $description, price: $price) { id name description price } }`**;

export default graphql(CREATE_PRODUCT_MUTATION)(CreateProduct);

```

```

<data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2730%27%20height=%2730%27/%3e>

the **`graphql`** higher-order component.

In conclusion, using GraphQL instead of traditional REST endpoints provides several advantages, such as the ability to retrieve only the data that you need in a single request, and the ability to modify data using mutations. In a React application, you can use the **`graphql`** higher-order component from the **`react-apollo`** library to make GraphQL queries and mutations, and to access the data in your components. By using GraphQL in your application, you can improve the performance and efficiency of your data access and modification operations.

One more advantage of using GraphQL is that it allows for strong typing of data. With REST APIs, the data that is returned from the API is often loosely typed, meaning that it can be difficult to predict the structure and format of the data. This can lead to errors in your application, such as when a field that you expect to be a string is actually an integer or boolean.

With GraphQL, you can define a schema that specifies the types of data that are available in the API, as well as the relationships between the data. This allows you to work with strongly typed data in your application, which can improve the reliability and predictability of your data operations.

For example, here is how you can define a GraphQL schema for a product type:

```

```

In this schema, the **`Product`** type has several fields, such as **`id`**, **`name`**, **`description`**, and **`price`**, which have specific data types, such as **`ID`**, **`String`**, and **`Float`**. The **`Product`** type also has a **`reviews`** field, which is an array of **`Review`** objects. This allows you to specify the data types and relationships between the data in the API.

In a React application, you can use the **`TypeScript`** programming language to work with strongly typed data in your components. TypeScript is a superset of JavaScript that adds support for static typing, interfaces, and classes. This allows you to specify the data types of your variables and props, and to catch errors at compile time instead of runtime.

For example, here is how you can use TypeScript to define the props for a component that receives a product from the GraphQL API:

```

```

In this example, the `ProductDetails

component uses the **`Product`** interface from the **`./types`** module to define the data types of the **`product`** prop. This allows TypeScript to check the data types at compile time and provide helpful error messages if there are any type errors in the code.

By using GraphQL and TypeScript together, you can take advantage of the strong typing of GraphQL and the type checking of TypeScript to improve the reliability and predictability of your data operations in a React application. This can help you avoid runtime errors and make your application more robust and maintainable.
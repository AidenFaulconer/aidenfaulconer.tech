---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-13T23:25:07.820Z
title: Deploying with Kubernetes, Helm charts, and azure
metaDescription: Scalable fullstack applications can be complex and difficult to
  build and deploy. However, by using the right tools and technologies, you can
  simplify the process and make it easier to develop and maintain your
  applications. In this blog post, we will explore how to use Helm, Docker, and
  Kubernetes to build a scalable fullstack application written in TypeScript,
  using the Next.js framework, and deploy it on Azure.
thumbnail: public/assets/me.png
---
<!--StartFragment-->

- - -

Scalable fullstack applications can be complex and difficult to build and deploy. However, by using the right tools and technologies, you can simplify the process and make it easier to develop and maintain your applications. In this blog post, we will explore how to use Helm, Docker, and Kubernetes to build a scalable fullstack application written in TypeScript, using the Next.js framework, and deploy it on Azure.

First, let's talk about Helm. Helm is a package manager for Kubernetes that makes it easier to install, upgrade, and manage Kubernetes applications. It uses a packaging format called Charts, which are pre-configured templates that define the resources and dependencies of a Kubernetes application. By using Helm, you can automate the process of deploying and managing your applications on Kubernetes, and focus on building your application instead.

Next, let's talk about Docker. Docker is a containerization platform that makes it easier to package and deploy your applications. It allows you to isolate your application and its dependencies in a container, which can be run on any host that supports Docker. This makes it easier to develop and test your application, and ensures that it will run consistently across different environments.

Finally, let's talk about Kubernetes. Kubernetes is a powerful orchestration platform that allows you to manage and scale your applications on the cloud. It provides a declarative API that allows you to define the desired state of your application, and then it automatically manages the underlying infrastructure to ensure that your application is always running and available.

To build and deploy a scalable fullstack application using Helm, Docker, and Kubernetes, you will need to perform the following steps:

1. Create a Next.js application
2. Create a Dockerfile for your application
3. Create a Helm Chart for your application
4. Create a Kubernetes deployment for your application
5. Deploy your application on Azure

Let's take a closer look at each of these steps, and see how they can be implemented in code.

## **1. Create a Next.js application**

To create a Next.js application, you will need to install the Next.js framework and create a new project using the **`create-next-app`** command. This will generate a boilerplate application that you can use as a starting point for your own application.

Here's an example of how to create a Next.js application:

```
$ npm install -g create-next-app
$ create-next-app my-app
$ cd my-app


```

Once you have created your Next.js application, you can start the development server and try out your application by running the **`npm run dev`** command. This will start the server and open your application in the browser, where you can see the default Next.js page.

## **2. Create a Dockerfile for your application**

To create a Dockerfile for your application, you will need to define the steps to build and run your application in a Docker container. This will typically involve defining the base image to use, installing the required dependencies, copying the application code, and exposing the port on which the application will run.

Here's an example of a Dockerfile for a Next.js application:

```
FROM node:12.16.1-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

RUN yarn install

COPY . /usr/src/app

EXPOSE 3000

CMD ["yarn", "start"]


```

In this example, the Dockerfile starts from the **`node:12.16.1-alpine`** base image, which contains the Node.js runtime and the Alpine Linux distribution. It then creates a directory for the application, copies the **`package.json`** and **`yarn.lock`** files, installs the dependencies, copies the application code, and exposes the **`3000`** port. Finally, it runs the **`yarn start`** command to start the application.

To build and run your Docker image, you can use the **`docker build`** and **`docker run`** commands. Here's an example of how to build and run your Docker image:

```
$ docker build -t my-app .
$ docker run -p 3000:3000 -d my-app


```

In this example, the **`docker build`** command builds the Docker image from the Dockerfile, and tags it as **`my-app`**. The **`docker run`** command runs the Docker image, maps the **`3000`** port of the container to the **`3000`** port of the host, and runs the container in detached mode.

To test your Dockerized application, you can open the **`http://localhost:3000`** URL in your browser, and see your Next.js application running in a Docker container.

## **3. Create a Helm Chart for your application**

To create a Helm Chart for your application, you will need to define the resources and dependencies of your application in a Chart file. This file is written in YAML, and it specifies the containers, volumes, and services that your application needs to run.

Here's an example of a Helm Chart file for a simple Next.js application:

```
apiVersion: v2
name: next-app
description: A simple Next.js application
version: 0.1.0

appVersion: 1.0.0

maintainers:
- name: John Doe
  email: john.doe@example.com

icon: https://raw.githubusercontent.com/zeit/art/master/next/icon.png

home: https://nextjs.org/

sources:
- https://github.com/zeit/next.js

keywords:
- next
- next.js
- server-side rendering
- react
- javascript

engine: gotpl

# The chart's container image
container:
  image: 'node:12-alpine'

# The chart's dependencies
dependencies:
  - name: redis
    version: '6.0.6'
    repository: 'https://kubernetes-charts.storage.googleapis.com/'
    condition: redis.enabled

# The chart's values
values:
  # The port that the application will listen on
  port: 3000

  # The name of the application
  name: next-app

  # The environment variables for the application
  env:
    NODE_ENV: production

  # The redis chart values
  redis:
    enabled: false
    name: next-app-redis
    service:
      type: ClusterIP
      port: 6379


```

In this example, the Helm Chart file defines the **`next-app`** application and its dependencies. It specifies the **`node:12-alpine`** container image that will be used to run the application, and it defines a **`redis`** dependency that can be enabled or disabled using the **`redis.enabled`** condition. It also specifies the **`port`**, **`name`**, and **`env`** values for the application, as well as the **`redis`** chart values.

Once you have defined your Helm Chart file, you can use the **`helm install`** command to install your application on Kubernetes. This will create the necessary resources and dependencies, and it will make your application available to users.

Here's an example of how to install your Helm Chart on Kubernetes:

```
$ helm install next-app next-app-0.1.0.tgz


```

In this example, the **`helm install`** command installs the **`next-app`** Helm Chart from the **`next-app-0.1.0.tgz`** file, and it creates the resources and dependencies for the application.

## **4. Create a Kubernetes deployment for your application**

To create a Kubernetes deployment for your application, you will need to define the desired state of your application using a Deployment file. This file is written in YAML, and it specifies the containers, volumes, and services that your application needs to run.

Here's an example of a Kubernetes Deployment file for a simple Next.js application:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: next-app-deployment
  labels:
    app: next-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: next-app
  template:
    metadata:
      labels:
        app: next-app
    spec:
      containers:
      - name: next-app
        image: node:12-alpine
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: NODE_ENV
          value: "production"


```

In this example, the Kubernetes Deployment file defines a **`next-app-deployment`** deployment that consists of three replicas of the **`next-app`** container. It specifies the **`node:12-alpine`** container image that will be used to run the application, and it sets the **`NODE_ENV`** environment variable to **`production`**.

Once you have defined your Kubernetes Deployment file, you can use the **`kubectl apply`** command to deploy your application on Kubernetes. This will create the necessary resources and dependencies, and it will make your application available to users.

Here's an example of how to deploy your application on Kubernetes:

```
$ kubectl apply -f next-app-deployment.yaml


```

In this example, the **`kubectl apply`** command deploys the **`next-app-deployment.yaml`** Kubernetes Deployment file, and it creates the resources and dependencies for the application.

## **5. Deploy your application on Azure**

To deploy your application on Azure, you will need to create an Azure Kubernetes Service (AKS) cluster and connect it to your Kubernetes deployment. This will allow you to run your application on Azure, and take advantage of the scalability and reliability of the Azure platform.

Here's an example of how to create an AKS cluster and connect it to your Kubernetes deployment:

```
$ az aks create -n my-aks-cluster -g my-resource-group
$ az aks get-credentials -n my-aks-cluster -g my-resource-group


```

In this example, the **`az aks create`** command creates an AKS cluster named **`my-aks-cluster`** in the **`my-resource-group`** resource group, and the **`az aks get-credentials`** command retrieves the credentials for the cluster and saves them in your local Kubernetes configuration file.

Once you have created your AKS cluster and connected it to your Kubernetes deployment, you can use the **`kubectl`** command to deploy your application on the cluster. This will create the necessary resources and dependencies, and it will make your application available to users.

Here's an example of how to deploy your application on the AKS cluster:

```
$ kubectl apply -f next-app-deployment.yaml


```

In this example, the **`kubectl apply`** command deploys the **`next-app-deployment.yaml`** Kubernetes Deployment file on the **`my-aks-cluster`** AKS cluster, and it creates the resources and dependencies for the application.

Once your application has been deployed on the AKS cluster, you can use the **`kubectl`** command to view the status of your deployment and make sure that everything is running correctly.

Here's an example of how to view the status of your deployment:

```
$ kubectl get deployments
$ kubectl get pods


```

In this example, the **`kubectl get deployments`** command shows the status of your deployment, and the **`kubectl get pods`** command shows the status of your pods.

## **Conclusion**

In this article, we have seen how to build and deploy a scalable fullstack application using Helm, Docker, and Kubernetes. We have learned how to define a Helm Chart for our application, how to create a Kubernetes deployment, and how to deploy our application on Azure.

Using these techniques, you can create a highly scalable and reliable application that can handle large amounts of traffic and data, and provide a great user experience to your customers.

<!--EndFragment-->
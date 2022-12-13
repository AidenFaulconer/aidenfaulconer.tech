---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-13T23:30:48.258Z
title: Getting started with Azure
metaDescription: Azure is a cloud computing platform that provides a wide range
  of services and tools for building, deploying, and managing applications and
  infrastructure. It is a popular choice for many organizations, from small
  startups to large enterprises, because of its flexibility and scalability. In
  this blog post, we will take a look at how to get started with Azure,
  including deploying a static website, using Azure Storage for image storage,
  configuring a content delivery network (CDN) with Cloudflare, using Azure Load
  Balancer for load balancing, managing billing, creating user groups, and
  configuring resource groups.
thumbnail: public/assets/me.png
---
<!--StartFragment-->

Azure is a cloud computing platform that provides a wide range of services and tools for building, deploying, and managing applications and infrastructure. It is a popular choice for many organizations, from small startups to large enterprises, because of its flexibility and scalability. In this blog post, we will take a look at how to get started with Azure, including deploying a static website, using Azure Storage for image storage, configuring a content delivery network (CDN) with Cloudflare, using Azure Load Balancer for load balancing, managing billing, creating user groups, and configuring resource groups.

# 1. Set up your azure account

To get started with Azure, you will need to create an Azure account and sign in to the Azure portal. This is the web-based management interface for Azure, where you can create and manage all of your Azure resources.

Once you are signed in to the Azure portal, you can deploy a static website by following these steps:

1. In the Azure portal, click on the "Create a resource" button and search for "storage account".
2. Click on the "Storage account" result and then click on the "Create" button.
3. On the "Create storage account" page, enter a name for your storage account, select a subscription and resource group, and then choose "Static website" under "Account kind".
4. Click on the "Review + create" button to review your storage account settings and then click on the "Create" button to create the storage account.

After the storage account has been created, you can upload your static website files to the storage account. To do this, follow these steps:

1. In the Azure portal, navigate to your storage account and click on the "Static website" tab.
2. Click on the "Enabled" button to enable static website hosting for your storage account.
3. Enter the name of the index document and the error document, such as "index.html" and "error.html", and then click on the "Save" button.
4. Click on the "Upload" button to upload your website files to the storage account.

Once your website files have been uploaded, you can access your website by using the URL provided under the "Primary endpoint" on the "Static website" tab.

To use Azure Storage for storing and serving images for your website, you can use the Azure Blob Storage service. This service provides scalable and durable storage for a variety of data types, including images, videos, and documents. To use Azure Blob Storage, follow these steps:

1. In the Azure portal, click on the "Create a resource" button and search for "storage account".
2. Click on the "Storage account" result and then click on the "Create" button.
3. On the "Create storage account" page, enter a name for your storage account, select a subscription and resource group, and then choose a performance tier and replication option.
4. Click on the "Review + create" button to review your storage account settings and then click on the "Create" button to create the storage account.

After the storage account has been created, you can create a container in the storage account for your images. To do this, follow these steps:

1. In the Azure portal, navigate to your storage account and click on the "Containers" tab.
2. Click on the "Add" button to create a new container and give it a name, such as "images".
3. Select the access level for the container, such as "Blob" for public access, and then click on the "OK" button to create the container.

Now you can upload your images to the container by using the Azure portal or by using the Azure Storage API. To upload images using the Azure portal, follow these steps:

1. In the Azure portal, navigate to your storage account and click on the "Containers" tab.
2. Click on the container that you want to upload images to and then click on the "Upload" button.
3. Select the images that you want to upload and then click on the "Open" button to upload the images to the container.

Once your images have been uploaded to the container, you can use the URL of the images to display them on your website. The URL for an image in a container will have the following format: **`https://<storage-account-name>.blob.core.windows.net/<container-name>/<image-name>`**.

# 2. setting up your cdn (cloudflare )

To use a CDN with Azure, you can use the Azure CDN service or a third-party CDN provider, such as Cloudflare. A CDN is a distributed network of servers that delivers content to users based on their geographic location, improving the performance and availability of your website.

To use Cloudflare with Azure, you will need to create a Cloudflare account and add your website to Cloudflare. This will provide you with a new DNS name for your website, which you will use instead of the Azure Storage URL. To configure Cloudflare to work with Azure Storage, follow these steps:

1. In the Cloudflare dashboard, click on the "Add a site" button and enter the DNS name of your website.
2. Click on the "Add site" button to add your website to Cloudflare and then click on the "Continue" button.
3. On the "DNS" tab, add a new "CNAME" record for your website, with the name of your website and the Azure Storage URL as the value.
4. On the "Caching" tab, configure the caching settings for your website, such as the cache expiration time.
5. On the "Origin" tab, add the Azure Storage URL as the origin server for your website.

After you have configured Cloudflare to work with Azure Storage, your website will be delivered via the Cloudflare CDN, improving the performance and availability of your website.

# 3. Load balancing in azure

Azure Load Balancer is a service that distributes incoming traffic across multiple instances of your application, improving the performance and availability of your application. This is especially useful for applications that receive a large amount of traffic or have multiple instances running in different regions or availability zones.

To use Azure Load Balancer, you will need to create a load balancer and configure it to balance traffic to your application. To create a load balancer, follow these steps:

1. In the Azure portal, click on the "Create a resource" button and search for "load balancer".
2. Click on the "Load Balancer" result and then click on the "Create" button.
3. On the "Create load balancer" page, enter a name for your load balancer, select a subscription and resource group, and then choose a region and IP address type.
4. Click on the "Review + create" button to review your load balancer settings and then click on the "Create" button to create the load balancer.

After the load balancer has been created, you can configure it to balance traffic to your application. To do this, follow these steps:

1. In the Azure portal, navigate to your load balancer and click on the "Backend pools" tab.
2. Click on the "Add a backend pool" button and enter a name for the backend pool.
3. Select the instances or virtual machines that you want to add to the backend pool and click on the "OK" button to add them.
4. Click on the "Load balancing rules" tab and click on the "Add a load balancing rule" button.
5. Enter a name for the load balancing rule, specify the protocol and port, and then select the backend pool and health probe.
6. Click on the "OK" button to create the load balancing rule.

After you have configured the load balancer, it will distribute incoming traffic to the instances in the backend pool based on the load balancing rules that you have defined.

In addition to deploying applications and managing infrastructure, Azure provides many other features for managing your account and resources, such as billing and user groups.

# 4. Azure billing

To manage billing for your Azure account, you can use the Azure billing and cost management service. This service provides tools for monitoring and managing your Azure spending, such as creating budgets and alerts, and viewing detailed reports on your usage and costs.

To create a budget and receive alerts for your Azure spending, follow these steps:

1. In the Azure portal, click on the "Billing" tab and then click on the "Budgets" tab.
2. Click on the "Add a budget" button and enter a name for the budget, such as "Monthly budget".
3. Select the scope for the budget, such as your subscription or a resource group, and then specify the budget amount and the start and end dates.
4. Select the alert settings for the budget, such as the threshold and email recipients, and then click on the "Save" button to create the budget.

After the budget has been created, Azure will monitor your spending and send alerts if you exceed the budget threshold.

# 5. user groups

To create user groups and manage access to Azure resources, you can use the Azure Active Directory service. This service provides tools for creating and managing user accounts and groups, and for assigning roles and permissions to users and groups.

To create a user group and assign roles to the group, follow these steps:

1. In the Azure portal, click on the "Azure Active Directory"

utton and then click on the "Groups" tab. 2. Click on the "New group" button and enter a name for the group, such as "Developers".

1. Select the group type, such as "Security", and then click on the "Create" button to create the group.
2. After the group has been created, click on the group and then click on the "Members" tab.
3. Click on the "Add members" button and select the user accounts that you want to add to the group.
4. Click on the "Select" button to add the users to the group.

After the users have been added to the group, you can assign roles to the group to grant it access to Azure resources. To do this, follow these steps:

1. In the Azure portal, navigate to the resource that you want to grant access to, such as a storage account.
2. Click on the "Access control (IAM)" tab and then click on the "Add" button.
3. In the "Add role assignment" window, select the role that you want to assign, such as "Reader", and then select the group that you want to grant access to.
4. Click on the "Save" button to save the role assignment and grant the group access to the resource.

By creating user groups and assigning roles, you can control who has access to your Azure resources and ensure that only authorized users have the appropriate level of access.

Finally, Azure provides the ability to organize and manage your resources using resource groups. A resource group is a logical container that holds related resources, such as storage accounts, virtual machines, and databases. By using resource groups, you can manage and deploy your resources in a consistent and organized way.

To create a resource group and add resources to it, follow these steps:

1. In the Azure portal, click on the "Create a resource" button and search for "resource group".
2. Click on the "Resource group" result and then click on the "Create" button.
3. On the "Create resource group" page, enter a

name for the resource group and select a subscription and location. 4. Click on the "Review + create" button to review the resource group settings and then click on the "Create" button to create the resource group.

After the resource group has been created, you can add resources to it by following these steps:

1. In the Azure portal, navigate to the resource group and click on the "Add" button.
2. Search for the type of resource that you want to add, such as "storage account" or "virtual machine".
3. Click on the result and then click on the "Create" button to create the resource.
4. On the "Create storage account" or "Create virtual machine" page, enter the settings for the resource, such as the name and location, and then select the resource group that you want to add the resource to.
5. Click on the "Review + create" button to review the resource settings and then click on the "Create" button to add the resource to the resource group.

After the resource has been added to the resource group, you can manage and deploy the resource group as a single entity. This can make it easier to manage and deploy your resources in a consistent and organized way.

In conclusion, Azure provides a wide range of tools and services for deploying and managing applications and infrastructure in the cloud. By using features such as static website hosting, Azure Storage, CDNs, load balancers, billing, user groups, and resource groups, you can take advantage of the flexibility and scalability of the cloud to improve the performance and availability of your applications.

<!--EndFragment-->
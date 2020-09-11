---
template: BlogPost
catagory: Blog
path: /blog/learn-gatsby
date: 2020-09-11T09:45:29.025Z
title: Gatsby beginner to advanced guide
metaDescription: A comprehensive guide to gatsby, the leader of the webs latest
  hot trend of static site builders
"thumbnail,": /assets/17si2f3o32qo6qd8yui1.png
---
<!--StartFragment-->

# Introduction

On my journey to learn gatsby came the time to learn graphql, an open source abstraction to the traditional way of querying data.



# Graphql

Learning to query content in GraphQL was interesting, I was used to the concept of tables and fields from my days utilizing SQL, but graphQL syntax resembles that of mongoDB where we see data as a collection of objects, with each objects primary key being a hash of that object, or it containing a special _id property.



GraphQL allows us to query until the last layer we can reach for a given table, so its not as simple as select * from parent, its more like parent { child { grandchild } }



Filtering from queries, we can take arguments in graphql which semantically resemble function parameters and work similar to them, we can take data and filter our results on it all within graphql’s language, for example

`{`

`human(id: "1000") {`

`name`

`height`

`}`

`}`

`Fetches an object of type human with human containing a field ‘id’ of 1000, we can nest these arguments to further filter down the hierarchy aswell, so we could filter the name.`

`{`

`human(id: “1000”}{`

`name(enumType: “aiden”)`

`height`

`}`

Because name dosent contain more than one value/or any fields it will contain enumeration types, which are data structures holding certain values such as a float, int, string, array, etc. They are often given custom names to make the language feel more human and relatable



## Alias’s

`{`

`empireHero: hero(episode: EMPIRE) {`

`name`

`}`

`jediHero: hero(episode: JEDI) {`

`name`

`}`

`}`

Here we can query the same field without type conflicts (since the data we are querying is of the same field type), we are fetching on field ‘hero’ but before that semantic declaration we put a newName: field(enumType: “EnumName”) to get two results of the same type with a different resulting name in which the results key:{} name will be that of the requested newName



## Fragments

Create reusable querying logic to break apart logic into pieces we can reuse and reassemble for more complicated queries

`fragment comparisonFields on Character {`

`name`

`appearsIn`

`friends {`

`name`

`}`

`}`

Declares a fragment named comparisonFields and to inject this query into another query we prepend a “...” as follows…

`{`

`leftComparison: hero(episode: EMPIRE) {`

`...comparisonFields`

`}`

`rightComparison: hero(episode: JEDI) {`

`...comparisonFields`

`}`

`}`

So now we have two more complicated queries with fewer lines and less redundancy that would otherwise complicate the codebased



## Variables

For even more complicated querying we can reuse specific values held in ve

# File Structure

There are problems using boilerplate, especially when your covering new frontier. My biggest problem was the filesystem configuration, I would have inconsistencies in the naming of folders because I did not know where all the logic handling it would be until I dug deeper, that time spend digging was greater than that I would have spent writing it from scratch based on reading documentation. There were several good parts about using boilerplate however, it gave me direct reference and source code to learn and understand, next time I will reference others code and write my own from scratch rather than having the source code itself to build upon. Moral of the story, its sometimes easier to build from scratch than build from whats been built.

# Graphql and gatsby

While building a blogging system for my personal website utilising netlifyCMS I learned where I needed to fetch data from. Using a plugin called gatsby-source-filesystem I was able to query information managed by netlifyCMS in a custom folder directory (which needed to align with the netlifyCMS configured paths



Blog posts managed by netlifycms were all contained in a table named ‘allMarkdownRemark’ to which we would access .edges and filter out the content based on the varying fields configured for each type of content held within.



I ran into the following error and was stuck, what was it? TypeError: t.innerWrappedControl is undefined… I later figured out that this was because I had incorrect types for the widgets in the configuration, a rookie mistake but something that wasnt as intuitive to find the issue for



## Markdown transform plugin creates the following section to overview



Configuration done in gatsby-node, creates a list of folders within page-data in the public folder, knowing this allowed me to debug my static content and find problems that seemed impossible to figure out before. This paradigm is very powerful, I can build many pages with whatever data format I wish within the createPage({}) api! I simply access these static pages through routes



The widgets used in default netlifycms correspond with graphql such as datetime, so it allows us access to specific querying options such as fromNow, formatString, etc.



To access markdown in the “body” label of our configuration, we must access a property called internal: { content {}}



# Learning netlify cms



Config.yml



This is everything in netlify cms, where its grand power comes from. This required learning to become adept in yaml and get used to its very inconvenient qwerks



Field and fields have significant differences that are easily overlooked and lead to confusion

Field only allows one in its collection while fields allows many, if you dont follow this paradigm you will get e.get is not a function, because there is no get method on field but there is one on fields



## Leveraging Netlify cms for more than blogging



I thought I could use netlify CMS for more than blogging, such as site configuration. And this works if you read in some JSON and use a file reference in netlify CMS’s configuration. The pros to that are that I can use an interface to modify the json data then query it. The cons are that if I wanted to add more configuration objects it would not be possible in the interface, as that feature seems to apply for blogging specifically.



I made a section on the netlify CMS interface that would allow me to add multiple configurations per page on the site, in this case the index page’s content. This worked! With some not-so-pretty results, when I went to see the graphql interface I got all sorts of new fields to query, but they were all congregated in the same area and the separation I once had before between blog post and site configuration, became a lot more murky to a wandering eye. For me this will work, but if i were to hand this to a team of developers they would find it confusing and unscalable. So I had to think of ways to overcome this problem, I thought… I had to make a plugin to separate different remark based on its collection type
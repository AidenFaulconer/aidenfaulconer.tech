this folder contains a JSON file that serves as a model for the data that will populate the stores, this is needed because in order for vue to be reactive to data changes, it needs to have a model of it at initialization, where it then attatches a getter and setter to each child field relative to the parent hosting each field. with these getters and setters vue listens to changes.

having the default data mapped out in json in one file makes it easier to tweak over time

default data populates data at application initialization

default users creates a set of users with there own data for testing purposes and populating the application
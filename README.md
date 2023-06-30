Deploy a server locally and automate API tests.

Environment settings:
Before proceeding with the task, you need to install and configure the following tools and carefully review the json-server documentation (https://github.com/typicode/json-server).
For requests, we will use a JSON server with authentication (https://github.com/jeremyben/json-server-auth)
To install the JSON server, use the following command:
npm install json-server-auth
Start the JSON server with the following command:
npx json-server-auth http://jsonplaceholder.typicode.com/db
The JSON server should now be running at http://localhost:3000.

 #	 Task	 Endpoint	 Expected response status-code
 
1.	Get all posts. Verify HTTP response status code and content type.	 /posts	 200 OK
2.	Get only first 10 posts. Verify HTTP response status code. Verify that only first posts are returned.	/posts	 200 OK
3.	Get posts with id = 55 and id = 60. Verify HTTP response status code. Verify id values of returned records.	/posts	 200 OK
4.	Create a post. Verify HTTP response status code.	/664/posts	 401
5.	Create post with adding access token in header. Verify HTTP response status code. Verify post is created.	/664/posts	 201
6.	Create post entity and verify that the entity is created. Verify HTTP response status code. Use JSON in body.	/posts	 201
7.	Update non-existing entity. Verify HTTP response status code.	/posts	 404
8.	Create post entity and update the created entity. Verify HTTP response status code and verify that the entity is updated.	/posts	 200
9.	Delete non-existing post entity. Verify HTTP response status code.	/posts	 404
10.	Create post entity, update the created entity, and delete the entity. Verify HTTP response status code and verify that the entity is deleted.	/posts	 200.


# Notion Api

A simple blog application built on the notion api.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NOTION_TOKEN` { your notion api secret key }

`NOTION_DATABASE_ID` { the notion database you will be querying }

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/kodegrenade/notion-api
```

Go to the project directory

```bash
  cd notion-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

  
## Usage/Examples

Open the url below on your broswer to access the available endpoints.

```
http://localhost/api-docs
```

  
## API Reference

#### Blog Posts

```http
  GET /api/v1/blog/posts
```

#### Create Blog Post

```http
  POST /api/v1/create/database
```

| Parameter     | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `title`       | `string` | **Required**. Title of the blog post |
| `tags`        | `array`  | **Require**. Tags of the blog post   |
| `description` | `text`   | **Required**. Body of the blog post  |



## License

[MIT](https://choosealicense.com/licenses/mit/)

  
## Authors

- [@kodegrenade](https://www.github.com/kodegrenade)

  
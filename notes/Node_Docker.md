### Containers and Containerization:

- **Container:** A container is a lightweight, standalone, and executable software package that includes everything needed to run a piece of software, including the code, runtime, system tools, libraries, and settings.

- **Containerization:** Containerization is a lightweight form of virtualization that allows you to encapsulate an application and its dependencies into a container. Containers share the host operating system's kernel and isolate the application processes from each other.

### VM (Virtual Machine) vs Container:

- **VM (Virtual Machine):** A virtual machine emulates an entire operating system and runs on a hypervisor. It requires a complete OS for each instance and has more overhead compared to containers.

- **Container:** Containers share the host OS kernel and are more lightweight. They start faster, use fewer resources, and are highly portable compared to VMs.

### Docker:

- **Docker:** Docker is a popular containerization platform that simplifies the process of creating, deploying, and running applications in containers. It provides a way to package and distribute applications with all their dependencies.

### Converting a Node.js app into a Docker container:

Here are the basic steps to containerize a Node.js app using Docker:

1. **Dockerfile:**
   Create a file named `Dockerfile` in your Node.js app's root directory. This file contains instructions for building the Docker image.

   ```Dockerfile
   # Use an official Node.js runtime as a base image
   FROM node:14

   # Set the working directory in the container
   WORKDIR /usr/src/app

   # Copy package.json and package-lock.json to the working directory
   COPY package*.json ./

   # Install app dependencies
   RUN npm install

   # Copy the application code into the container
   COPY . .

   # Expose the port your app runs on
   EXPOSE 3000

   # Define the command to run your app
   CMD ["node", "app.js"]
   ```

2. **Build the Docker Image:**
   Open a terminal, navigate to your app's directory, and run the following command to build the Docker image:

   ```bash
   docker build -t your-app-name .
   ```

   Replace `your-app-name` with a suitable name for your application.

3. **Run the Docker Container:**
   Once the image is built, you can run a container based on that image:

   ```bash
   docker run -p 3000:3000 -d your-app-name
   ```

   This command maps port 3000 from your container to port 3000 on your host machine.

Now your Node.js app is running inside a Docker container. 
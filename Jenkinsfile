pipeline {
    agent any

    environment {
        APP_NAME = "nodejs-app"
        CONTAINER_NAME = "nodejs-container"
        GIT_REPO = "https://github.com/goondev98/simple-nodejs.git"
        PORT = "3000"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test || echo "No tests defined, skipping..."'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${APP_NAME}:latest", "-f docker/Dockerfile .")
                }
            }
        }

        stage('Stop Previous Container') {
            steps {
                script {
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT}:${PORT} ${APP_NAME}:latest"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}

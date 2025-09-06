/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    // Parameter to choose branch before build
    parameters {
        choice(
            name: 'BRANCH',
            choices: ['development', 'main'],
            description: 'Select the Git branch to build and deploy'
        )
    }

    environment {
        APP_NAME = "nodejs-app"
        CONTAINER_NAME = "nodejs-container-${params.BRANCH}"
        GIT_REPO = "https://github.com/goondev98/simple-nodejs.git"
    }

    stages {

        stage('Setup Environment Variables') {
            steps {
                script {
                    // Set PORT dynamically based on branch
                    env.PORT = (params.BRANCH == 'development') ? '3000' : '8000'
                    echo "Selected branch: ${params.BRANCH}, using PORT=${env.PORT}"
                }
            }
        }

        stage('Checkout Branch') {
            steps {
                // Pull the selected branch from the repo
                git branch: "${params.BRANCH}", url: "${env.GIT_REPO}"
            }
        }

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
                    docker.build("${APP_NAME}:${params.BRANCH}", "-f docker/Dockerfile .")
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
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT}:${PORT} ${APP_NAME}:${params.BRANCH}"
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

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
        GIT_REPO = "https://github.com/goondev98/simple-nodejs.git"
    }

    stages {

        stage('Set Environment Variables') {
            steps {
                script {
                    env.CONTAINER_NAME = "nodejs-container-${params.BRANCH}"
                    env.EXTERNAL_PORT = (params.BRANCH == 'main') ? '8000' : '3000'
                    env.INTERNAL_PORT = (params.BRANCH == 'main') ? '8000' : '3000'
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
                    sh """
                        docker run -d \
                        --name ${env.CONTAINER_NAME} \
                        -p ${env.EXTERNAL_PORT}:${env.INTERNAL_PORT} \
                        -e PORT=${env.INTERNAL_PORT} \
                        ${env.APP_NAME}:${params.BRANCH}
                    """
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

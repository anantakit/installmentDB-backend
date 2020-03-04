pipeline {
    agent any
    environment {
        imgServer="portus.odds.team/odds-installment/server:pipe-${BUILD_NUMBER}"
        imgClient="portus.odds.team/odds-installment/client:pipe-${BUILD_NUMBER}"
        registry="https://portus.odds.team"
        appServer="odds-installment-server"
        appClient="odds-installment-client"
        type="service"
        env="prod"
        portServer="5000"
        portClient="80"
    }
    options {
        ansiColor('xterm')
    }
    stages{
        stage('Build Imager Server And Push') {
            steps {
                    dir ('server') {
                        sh "docker build -t ${imgServer} ."
                    }
            } 
        }
        stage('Push Image Server') {
            steps {
                withDockerRegistry(credentialsId: 'portus-jenkins', url: registry) {
                    sh "docker push ${imgServer}"
                }
            }
        }
        stage('Build Imager Client And Push') {
            steps {
                    dir ('client') {
                        sh "docker build --build-arg environment=${env} -t ${imgClient} ."
                    }
                }
            }
        stage('Push Image Client') {
            steps {
                withDockerRegistry(credentialsId: 'portus-jenkins', url: registry) {
                    sh "docker push ${imgClient}"
                }
            }
        }
        stage('Deploy Docker-compose and Apply Docker-compose'){
            steps{
                withDockerRegistry(credentialsId: 'portus-jenkins', url: registry) {
                    sh "cp $DOCKER_CONFIG/config.json ."
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'odds-installment',
                                transfers: [
                                    sshTransfer(
                                        cleanRemote: false,
                                        excludes: '',
                                        execCommand: "DOCKER_CONFIG=~ TAG=pipe-${BUILD_NUMBER} docker-compose up -d",
                                        execTimeout: 120000, 
                                        flatten: false, 
                                        makeEmptyDirs: false,
                                        noDefaultExcludes: false,
                                        patternSeparator: '[, ]+',
                                        remoteDirectory: '',
                                        remoteDirectorySDF: false, 
                                        removePrefix: '', 
                                        sourceFiles: 'docker-compose.yaml, config.json'
                                    )
                                ], 
                                usePromotionTimestamp: false, 
                                useWorkspaceInPromotion: false, 
                                verbose: false
                            )
                        ]
                    )
                }
            }
        }
    }
}

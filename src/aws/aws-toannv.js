import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
interface IPoolData {
    UserPoolId: any;
    ClientId: any;
}
interface IUserData {
    Username: any;
    Pool: any;
}
export default class AWSToannv {
    poolData: IPoolData;
    userPool: any;
    userData: IUserData;
    cognitoUser: any;

    constructor() {
        this.poolData = {
            UserPoolId: 'ap-northeast-1_ZgmKez4im', // your user pool id here
            ClientId: '6fu5i4spailmf9t9l6t4mdfodb' // your app client id here
        };
        this.userPool = new CognitoUserPool(this.poolData);
        this.userData = {
            Username: 'username', // your username here
            Pool: this.userPool
        };
        this.cognitoUser = new CognitoUser(this.userData);
    }
    signup = (username, name, email, password) => {
        // this.poolData = {
        //   UserPoolId: 'ap-northeast-1_ZgmKez4im', // your user pool id here
        //   ClientId: '6fu5i4spailmf9t9l6t4mdfodb' // your app client id here
        // };
        // this.userPool = new CognitoUserPool(this.poolData);
        let attributeList = [];
        const dataEmail = {
            Name: 'email',
            Value: email
        };
        const dataName = {
            Name: 'name',
            Value: name
        };
        let attributeEmail = new CognitoUserAttribute(dataEmail);
        let attributePhoneNumber = new CognitoUserAttribute(dataName);
        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);
        console.log(username);
        this.userPool.signUp(username, password, attributeList, null, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            this.cognitoUser = result.user;
            console.log('user name is ' + this.cognitoUser.getUsername());
        });
    }
    confirmRegister = () => {
        this.cognitoUser.confirmRegistration('246332', true, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            alert(result);
        });
        return 'SUCCESS CONFIRM';
    }
    authenUser = (username, password) => {
        var authenData = {
            Username: username,
            Password: password
        }
        var authenDetails = new AuthenticationDetails(authenData);
        this.cognitoUser.authenticateUser(authenDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                /*Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
                console.log('idToken + ' + result.idToken.jwtToken);
                return result.idToken.jwtToken;
            },
            onFailure: function (err) {
                console.log(err);
                return err;
            },

        });
    }

}
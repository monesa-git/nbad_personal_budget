class User{
    constructor(user){
        this._id=user._id;
        this.firstName=user.firstName;
        this.lastName=user.lastName;
        this.gender = user.gender;
        this.age = user.age;
        this.email=user.email;
        this.password=user.password;
    }

    getUser(){
        var usr = {
            "_id":this._id,
            "firstName":this.firstName,
            "lastName":this.lastName,
            "gender":this.gender,
            "age":this.age,
            "email":this.email
        }

        return usr;
    }
}
module.exports = User;
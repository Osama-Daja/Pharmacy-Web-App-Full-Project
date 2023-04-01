export class User{
    Id = 0;
    UserName = '';
    Email = '';
    PhoneNumber = '';
    Block = false;
    NickName = '';
    Gender = false;
    Image = '';
    Password = '';

    //Employee
    Salary = 0;
    BranchId= 0;

    //Customer
    Latitude = 0;
    Longitude = 0;
    BirthDay = new Date;

    //Edit
    PasswordEdit = '';



    //Out
    id = 0;
    userName = '';
    email = '';
    phoneNumber = '';
    block = false;
    nickName = '';
    gender = false;
    image = '';
    password = '';

    //Employee
    salary = 0;
    branchId= 0;

    //Customer
    latitude = 0;
    longitude = 0;
    birthDay = new Date;
}


export class Employee{
    Id = 0;
    UserName = '';
    Password = '';
    Email = '';
    PhoneNumber = '';
    Block = false;
    NickName = '';
    Gender = false;
    Image = '';

    Salary = 0;
    BranchId = 0;

    ShowChangeSalary = false;
    NewSalary = 0;

    ShowChangePassword = false;
    NewPassword = '';

    id = 0;
    userName = '';
    password = '';
    email = '';
    phoneNumber = '';
    block = false;
    nickName = '';
    gender = false;
    image = '';
    branchName = '';

    salary = 0;
    branchId = 0;

    //Edit
    SalaryEdit =0;
    PasswordEdit = '';
}

export class Customer{
    Id = 0;
    UserName = '';
    Password = '';
    Email = '';
    PhoneNumber = '';
    Block = false;
    NickName = '';
    Gender : any = false ;
    Image = '';

    Latitude = 0;
    Longitude = 0;
    BirthDay = new Date;
    NewPassword='';
    ShowChangePassword = false;
}

export class Message {
    text  = '';
    currentDate : Date = new Date;
}




import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/Shared/Models/Branch';
import { Employee, User } from 'src/app/Shared/Models/User';
import { OurservicesprivateService } from './ourservicesprivate.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../Models/Product';
import { CompanyOfOrigin } from '../../Models/CompanyOfOrigin';
import { Category } from '../../Models/Category';
import { Testimonial } from '../../Models/Testimonial';
import { Slider } from '../../Models/Slider';
import { Stock } from '../../Models/Stock';

@Injectable({
  providedIn: 'root'
})
export class OurservicesadminService {

  //Form Groups
  //Branch
  FormBranchUpdate = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Latitude: new FormControl(0),
    Longitude: new FormControl(0),
    Geometry: new FormControl([])
  })

  FormCustomerUpdate = new FormGroup({
    Id: new FormControl(0),
    UserName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    PhoneNumber: new FormControl('', [Validators.required]),
    NickName: new FormControl('', [Validators.required]),
    Gender: new FormControl('False', [Validators.required])
  })

  FormDeliveryUpdate = new FormGroup({
    Id: new FormControl(0),
    UserName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    PhoneNumber: new FormControl('', [Validators.required]),
    NickName: new FormControl('', [Validators.required]),
    Gender: new FormControl('False', [Validators.required]),
    BranchId: new FormControl('', Validators.required)
  })

  FormProductUpdate = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('', [Validators.required]),
    CompanyOfOriginId: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    CategoryId: new FormControl('', [Validators.required]),
    IMGProduct: new FormControl(null, [Validators.required]),
  })

  Lat : string | null = null;
  Long : string | null = null;
  
  MapDelivery: any;

  MyAccountData = new User;

  ListBranch: any = [];
  ListFullBranch: any = [];
  ListCustomer: any = [];
  ListDelivery: any = [];
  ListProduct: any = [];
  ListCategory: any = [];
  ListCompanyOfOrigin: any = [];
  ListTestimonial: any = [];
  ListContactUs: any = [];
  DetailsBranch: any = null;
  DetailsProduct: any = null;
  ListSlider: any = [];
  ListStock: any = [];
  ListOfBags : any[]=[];
  ListReportDetails:any[]=[];
  ReportDetails:any;

  //----------------------Home
  HomeListProduct : any[]=[];
  HomeListBranches : any[]=[];
  HomeListActiveOrders : any[]=[];


  ExtensionForImage = ['jpeg', 'jpg', 'png', 'svg'];
  //Users
  //Admin
  ListAdmin: Employee[] = [];

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private OurservicesprivateService: OurservicesprivateService) { }


  URLIMG = 'https://localhost:44315/';
  URL = this.URLIMG + "api/";

  //---------------------------------------------------------------------------------------Branch
  InsertBranch(branch: Branch) {
    var body = {
      Name: branch.Name,
      Description: branch.Description,
      Latitude: branch.Latitude,
      Longitude: branch.Longitude,
      Geometry: branch.Geometry
    }

    this.http.post(this.URL + 'Branch/InsertBranch', body).subscribe(R => {
      this.toastr.success('Success');
      this.GetFullBranch();
    }, E => {
      this.toastr.warning('Error')
    })
  }

  GetBranch() {
    this.http.get(this.URL + 'Branch/GetBranch').subscribe(R => {
      this.ListBranch = R as [];
    }, E => { });
  }

  GetFullBranch() {
    this.http.get(this.URL + 'Branch/GetFullBranch').subscribe(R => {
      this.ListFullBranch = R as [];
    }, E => { });
  }

  GetBranchDetails(Id: number) {
    this.http.get(this.URL + 'Branch/GetBranchDetails/' + Id).subscribe(R => {
      this.DetailsBranch = R;
      this.router.navigateByUrl('/private/admin/detailsbranch');
    }, E => {
      this.toastr.warning('Empty Of Employees Or Products');

    });
  }

  GetDetailsMyBranch(){
    this.http.get(this.URL + 'Branch/GetDetailsMyBranch').subscribe(R => {
      this.DetailsBranch = R;
    });
  }

  UpdateBranch() {
    var body = {
      Id: this.FormBranchUpdate.controls.Id.value,
      Name: this.FormBranchUpdate.controls.Name.value,
      Description: this.FormBranchUpdate.controls.Description.value,
      Latitude: this.FormBranchUpdate.controls.Latitude.value,
      Longitude: this.FormBranchUpdate.controls.Longitude.value,
    }

    this.http.put(this.URL + 'Branch/UpdateBranch', body).subscribe(R => {
      this.toastr.success('Success');
      this.GetFullBranch();
    },E=>{
      this.toastr.warning('Unsuccess');
    })
  }

  UpdateBranchGEO(Geometry: string) {
    var body = {
      Id: this.FormBranchUpdate.controls.Id.value,
      Geometry: Geometry
    }

    this.http.put(this.URL + 'Branch/UpdateBranchGEO', body).subscribe(R => {
      this.toastr.success('Success');
      this.GetFullBranch();
    })
  }

  UpdateWorkHour(branch: Branch) {
    if (branch.StartWorkHours == undefined || branch.EndWorkHours == undefined) 
    { branch.StartWorkHours = null; branch.EndWorkHours = null; }
    var body = {
      Id: branch.id,
      StartWorkHours: branch.StartWorkHours,
      EndWorkHours: branch.EndWorkHours
    }

    this.http.put(this.URL + 'Branch/UpdateWorkHour', body).subscribe(R => {
      this.toastr.success('Success');
      this.GetFullBranch();
    })
  }

  DeleteBranch(id: number) {
    this.http.delete(this.URL + 'Branch/DeleteBranch/' + id).subscribe(R => {
      this.toastr.success('Success');
      this.GetFullBranch();
    }, E => {
      this.toastr.warning('Make Sure Empoyees And Products In Branch', 'Unsuccess')
    })
  }

  //---------------------------------------------------------------------------------------Users
  //Shared
  EditPasswordUser(Id: number, Password: string) {
    var body = {
      Id: Id,
      Password: Password
    }

    this.http.put(this.URL + 'Shared/EditPasswordUser', body).subscribe(R => {
      this.toastr.success('Success');
    })
  }

  //---------------------------------------------------------------------------------------SuperUser
  UpdateSuperUser(PhoneNumber: string, NickName: string, Gender: string) {
    var body = {
      PhoneNumber: PhoneNumber,
      NickName: NickName,
      Gender: Gender == 'True' ? true : false,
    }

    this.http.put(this.URL + 'ApplicationUser/UpdateSuperUser', body).subscribe(R => {
      this.toastr.success('Success');
      this.OurservicesprivateService.GetMyDataAccount();
    })
  }



  //---------------------------------------------------------------------------------------Admin
  UpdateAdmin(PhoneNumber: string, NickName: string, Gender: string) {
    var body = {
      PhoneNumber: PhoneNumber,
      NickName: NickName,
      Gender: Gender == 'True' ? true : false,
    }

    this.http.put(this.URL + 'ApplicationUser/UpdateAdmin', body).subscribe(R => {
      this.toastr.success('Success');
      this.OurservicesprivateService.GetMyDataAccount();
    })
  }
  RegisterAdmin(Employee: User) {
    var body = {
      UserName: Employee.UserName,
      Password: Employee.Password,
      Email: Employee.Email,
      PhoneNumber: Employee.PhoneNumber,
      NickName: Employee.NickName,
      Gender: Employee.Gender,
      Image: Employee.Image,
      BranchId: Employee.BranchId,
      Salary: Employee.Salary
    }

    this.http.post(this.URL + 'ApplicationUser/RegisterAdmin', body).subscribe(R => {
      this.toastr.success('Success');
    }, E => {
      if (E.status == 409) {
        this.toastr.warning('UserName Or Email Is Used');
      } else {
        this.toastr.error('Unsuccess');
      }
    })
  }
  EditUser(User: User) {
    var body = {
      Id: User.Id,
      UserName: User.UserName,
      Email: User.Email,
      PhoneNumber: User.PhoneNumber,
      NickName: User.NickName,
      Gender: User.Gender,
      BranchId: User.BranchId
    }


    this.http.put(this.URL + 'ApplicationUser/EditUser', body).subscribe(R => {
      this.toastr.success('Success');
      return true;
    }, E => {
      if (E.status == 409) {
        this.toastr.warning('UserName Or Email Is Used');
      } else {
        this.toastr.error('Unsuccess');
      }
    })
  }
  DeleteAdmin(Id: number) {
    this.http.delete(this.URL + 'ApplicationUser/DeleteAdmin/' + Id).subscribe(R => {
      this.toastr.success('Success');
    }, E => {
      this.toastr.error('There Are Relation with Account.')
    })
  }

  //Search
  SearchAdminByPhoneNumber(PhoneNumber: string) {
    var body = {
      PhoneNumber: PhoneNumber
    }

    this.http.post(this.URL + 'ApplicationUser/SearchAdminByPhoneNumber', body).subscribe(R => {
      this.ListAdmin = R as Employee [];
    })
  }

  SearchAdminByBranch(Id: number) {
    var body = {
      Id: Id
    }

    this.http.post(this.URL + 'ApplicationUser/SearchAdminByBranch', body).subscribe(R => {
      this.ListAdmin = R as [];
    })
  }


  //---------------------------------------------------------------------------------------Employee
  UpdateSalaryUser(Id: number, Salary: number) {
    var body = {
      Id: Id,
      Salary: Salary
    }
    this.http.put(this.URL + 'Shared/UpdateSalaryUser', body).subscribe(R => {
      this.toastr.success('Success');
    })
  }




  //---------------------------------------------------------------------------------------Block
  UpdateBlockUserForSuperUser(Id: number, Block: boolean) {
    var body = {
      Id: Id,
      Block: Block
    }
    this.http.put(this.URL + 'Shared/UpdateBlockUserForSuperUser', body).subscribe(R => {
      this.toastr.success('Success');
    })
  }

  UpdateBlockUserForAdmin(Id: number, Block: boolean) {
    var body = {
      Id: Id,
      Block: Block
    }

    this.http.put(this.URL + 'Shared/UpdateBlockUserForAdmin', body).subscribe(R => {
      this.toastr.success('Success');
      this.GetDeliveryByBranchId();
    })
  }





  //---------------------------------------------------------------------------------------Customer
  SearchCustomerByUserName(UserName: string) {
    var body = {
      UserName: UserName
    }

    this.http.post(this.URL + 'ApplicationUser/SearchCustomerByUserName', body).subscribe(R => {
      this.ListCustomer = R as [];
    })
  }

  SearchCustomerByPhoneNumber(PhoneNumber: string) {
    var body = {
      PhoneNumber: PhoneNumber
    }

    this.http.post(this.URL + 'ApplicationUser/SearchCustomerByPhoneNumber', body).subscribe(R => {
      this.ListCustomer = R as [];
    })
  }

  SearchCustomerByEmail(Email: string) {
    var body = {
      Email: Email
    }

    this.http.post(this.URL + 'ApplicationUser/SearchCustomerByEmail', body).subscribe(R => {
      this.ListCustomer = R as [];
    })
  }

  SearchCustomerByBranch(Id: number) {
    var body = {
      Id: Id
    }

    this.http.post(this.URL + 'ApplicationUser/SearchCustomerByBranch', body).subscribe(R => {
      this.ListCustomer = R as [];
    })
  }

  SearchCustomerByBirthDay(StartBirthDay: Date | undefined, EndBirthDay: Date | undefined) {
    var body = {
      StartBirthDay: StartBirthDay,
      EndBirthDay: EndBirthDay
    }

    this.http.post(this.URL + 'ApplicationUser/SearchCustomerByBirthDay', body).subscribe(R => {
      this.ListCustomer = R as [];
    })
  }

  DeleteCustomer(Id: number) {
    this.http.delete(this.URL + 'ApplicationUser/DeleteCustomer/' + Id).subscribe(R => {
      this.toastr.success('Success');
    }, E => {
      this.toastr.error('There Are Relation with Account.')
    })
  }


  //---------------------------------------------------------------------------------------Delivery
  RegisterDelivery(Employee: User) {
    var body = {
      UserName: Employee.UserName,
      Password: Employee.Password,
      Email: Employee.Email,
      PhoneNumber: Employee.PhoneNumber,
      NickName: Employee.NickName,
      Gender: Employee.Gender,
      Image: Employee.Image,
      BranchId: Employee.BranchId,
      Salary: Employee.Salary
    }

    this.http.post(this.URL + 'ApplicationUser/RegisterDelivery', body).subscribe(R => {
      this.toastr.success('Success');
      this.GetDeliveryByBranchId();
    }, E => {
      if (E.status == 409) {
        this.toastr.warning('UserName Or Email Is Used');
      } else {
        this.toastr.error('Unsuccess');
      }
    })
  }

  GetDeliveryByBranchId() {
    this.http.get(this.URL + 'ApplicationUser/GetDeliveryByBranchId').subscribe(R => {
      this.ListDelivery = R as [];

    })
  }

  DeleteDelivery(Id: number) {
    this.http.delete(this.URL + 'ApplicationUser/DeleteDelivery/' + Id).subscribe(R => {
      this.toastr.success('Success');
    }, E => {
      this.toastr.error('There Are Relation with Account.')
    })
  }

  //Search
  SearchDeliveryByPhoneNumber(PhoneNumber: string) {
    var body = {
      PhoneNumber: PhoneNumber
    }

    this.http.post(this.URL + 'ApplicationUser/SearchDeliveryByPhoneNumber', body).subscribe(R => {
      this.ListDelivery = R as [];
    })
  }

  SearchDeliveryByBranch(Id: number) {
    var body = {
      Id: Id
    }

    this.http.post(this.URL + 'ApplicationUser/SearchDeliveryByBranch', body).subscribe(R => {
      this.ListDelivery = R as [];
    })
  }

  GetDeliveryLocationById(Id: number) {
    return this.http.get(this.URL + 'DeliveryLocation/GetDeliveryLocationById/' + Id).subscribe((R: any) => {
      this.MapDelivery = R;
      this.MapDelivery.id = R.deliveryId;
    });
  }



  //---------------------------------------------------------------------------------------Product
  DeleteProduct(Id: number) {
    this.http.delete(this.URL + 'Product/' + Id).subscribe(R => {
      this.toastr.success('Success');
    }, E => {
      if (E.status == 404) { this.toastr.warning('Not Found'); } else {
        if (E.status == 406) { this.toastr.error('Product Is Used'); }
        else {
          this.toastr.success('Success');
        }
      }
    })
  }

  CreateProduct(Product: any) {
    const formData = new FormData();
    formData.append('IMGProduct', Product.IMGProduct);

    this.http.post(this.URL + 'Product?Name=' + Product.Name + '&Description=' + Product.Description +
      '&CompanyOfOriginId=' + Product.CompanyOfOriginId + '&Price=' + Product.Price + '&CategoryId=' + Product.CategoryId, formData)
      .subscribe(events => {
        this.toastr.success('Success');
      }, err => {
        this.toastr.error('Unsuccess');
      });

  }

  UpdateProduct() {

    this.http.put(this.URL + 'Product', this.FormProductUpdate.value).subscribe(R => {
      this.toastr.success('Success')
    }, E => {
      if (E.status == 404) { this.toastr.warning('Not Found'); } else {
        if (E.status == 406) { this.toastr.error('Unsuccess'); }
        else {
          this.toastr.success('Success');
        }
      }
    });

  }

  UpdateProductImage(IMGProduct: any) {

    const formData = new FormData();
    formData.append('IMGProduct', IMGProduct);

    this.http.put(this.URL + 'Product/UpdateProductImage/' + this.FormProductUpdate.controls.Id.value, formData)
      .subscribe(events => {
        this.toastr.success('Success');
      }, err => {
        this.toastr.error('Unsuccess');
      });
  }

  UpdateProductStatus(Id: number, Status: boolean) {
    var body = {
      Id: Id,
      Status: Status
    }

    this.http.put(this.URL + 'Product/UpdateProductStatus', body).subscribe(a => {
      this.toastr.success('Success');
     
    })
  }

  GetProductDetails(Id: number) {
    return this.http.get(this.URL + 'Product/GetProductDetails/' + Id).subscribe(a => {
      this.DetailsProduct = a;
      this.router.navigateByUrl('/private/admin/detailsproduct');
    });
  }

  //Search
  SearchProductByName(Body: any) {
    this.http.post(this.URL + 'Product/SearchProductByName', Body).subscribe(R => {
      this.ListProduct = R as [];
    }, E => {
      this.toastr.warning('Make Sure Enter All Values');
    });
  }

  SearchProductByCompanyOfOrigin(Body: any) {
    this.http.post(this.URL + 'Product/SearchProductByCompanyOfOrigin', Body).subscribe(R => {
      this.ListProduct = R as [];
    }, E => {
      this.toastr.warning('Make Sure Enter All Values');
    });
  }

  SearchProductByCategory(Body: any) {
    this.http.post(this.URL + 'Product/SearchProductByCategory', Body).subscribe(R => {
      this.ListProduct = R as [];
    }, E => {
      this.toastr.warning('Make Sure Enter All Values');
    });
  }

  SearchProductByPrice(Body: any) {

    this.http.post(this.URL + 'Product/SearchProductByPrice', Body).subscribe(R => {
      this.ListProduct = R as [];
    }, E => {
      this.toastr.warning('Make Sure Enter All Values');
    });
  }


  //---------------------------------------------------------------------------------------Category


  GetAllCategory() {
    this.http.get(this.URL + 'Category/GetAll').subscribe(R => {
      this.ListCategory = R as [];
    }, E => { });
  }

  AddCategory(category: Category) {

    if (category.Image != null) {
      const formData = new FormData();
      formData.append('IMG', category.Image);

      this.http.post(this.URL + 'Category/AddCategory?Name=' + category.Name + '&Description=' + category.Description, formData).subscribe(R => {
        this.GetAllCategory();
        this.toastr.success('Success');
      }, E => {
        this.toastr.warning('Error')
      })
    } else { this.toastr.warning('Make Sure Enter Image.') }
  }


  UpdateCategory(category: Category) {

    if (category.Image != null) {
      const formData = new FormData();
      formData.append('IMG', category.Image);

      this.http.put(this.URL + 'Category/UpdateCategory?Id=' + category.Id + '&Name=' + category.Name + '&Description=' + category.Description, formData).subscribe(R => {
        this.GetAllCategory();
        this.toastr.success('Success');
      }, E => {
        this.toastr.warning('Error')
      })
    } else {
      const formData: FormData | null = null;

      this.http.put(this.URL + 'Category/UpdateCategory?Id=' + category.Id + '&Name=' + category.Name + '&Description=' + category.Description, formData).subscribe(R => {
        this.GetAllCategory();
        this.toastr.success('Success');
      }, E => {
        this.toastr.warning('Error')
      })

    }
  }



  DeleteCategory(Id: number) {
    this.http.delete(this.URL + 'Category/DeleteCategory/' + Id).subscribe(R => {
      this.GetAllCategory();
      this.toastr.success('Success');
    }, E => {
      this.toastr.warning('Error')
    })
  }





  //---------------------------------------------------------------------------------------CompanyOfOrigin

  GetAllCompanyOfOrigin() {
    this.http.get(this.URL + 'CompanyOfOrigin/GetAll').subscribe(R => {
      this.ListCompanyOfOrigin = R as [];
    }, E => { });
  }


  AddCompanyOfOrigin(companyOfOrigin: CompanyOfOrigin) {
    var body = {
      Name: companyOfOrigin.Name,
      Description: companyOfOrigin.Description
    }

    this.http.post(this.URL + 'CompanyOfOrigin/AddCompanyOfOrigin', body).subscribe(R => {
      this.GetAllCompanyOfOrigin();
      this.toastr.success('Success');
    }, E => {
      this.toastr.warning('Error')
    })
  }


  UpdateCompanyOfOrigin(companyOfOrigin: CompanyOfOrigin) {
    var body = {
      Id: companyOfOrigin.Id,
      Name: companyOfOrigin.Name,
      Description: companyOfOrigin.Description
    }

    this.http.put(this.URL + 'CompanyOfOrigin/UpdateCompanyOfOrigin', body).subscribe(R => {
      this.GetAllCompanyOfOrigin();
      this.toastr.success('Success');
    }, E => {
      this.toastr.warning('Error')
    })
  }


  DeleteCompanyOfOrigin(Id: number) {
    this.http.delete(this.URL + 'CompanyOfOrigin/DeleteCompanyOfOrigin/' + Id).subscribe(R => {
      this.GetAllCompanyOfOrigin();
      this.toastr.success('Success');
    }, E => {
      this.toastr.warning('Error')
    })
  }
  //---------------------------------------------------------------------------------------Testamonials

  AddTestimonial(testimonial: Testimonial) {
    var body = {
      Text: testimonial.Text,

    }

    this.http.post(this.URL + 'Testimonial/AddTestimonial', body).subscribe(R => {
      this.toastr.success('Success');
    }, E => {
      this.toastr.warning('Error')
    })
  }

  DeleteTestimonial(Id: number) {
    this.http.delete(this.URL + 'Testimonial/DeleteTestimonial/' + Id).subscribe(R => {
      this.toastr.success('Success');
    }, E => {
      this.toastr.warning('Error')
    })
  }

  SearchTestamonialText(text: string) {
    var body = {
      text: text
    }

    this.http.post(this.URL + 'Testimonial/SearchTestimonialSearchByText', body).subscribe(R => {
      this.ListTestimonial = R as [];
    })
  }

  SearchDateTestamonial(startDate: Date, EndDate: Date) {
    var body = {
      StartDay: startDate,
      EndDay: EndDate
    }

    this.http.post(this.URL + 'Testimonial/SearchByDate', body).subscribe(R => {
      this.ListTestimonial = R as [];
    })
  }

  ChangeStatus(Testimonial: any) {
    var body = {
      Id: Testimonial.id,
      Status: Testimonial.status
    }
    this.http.put(this.URL + 'Testimonial/UpdateTestimonialBlockStatus', body).subscribe(R => {
      this.toastr.success('success');
      Testimonial.status = !Testimonial.status;
    })
  }

  //---------------------------------------------------------------------------------------ContactUs


  SearchContactUsEmail(email: string) {
    var body = {
      email: email
    }

    this.http.post(this.URL + 'ContactU/SearchContactUsByEmail', body).subscribe(R => {
      this.ListContactUs = R as [];
    })
  }

  SearchContactUsPhoneNumber(phoneNumber: string) {
    var body = {
      PhoneNumber: phoneNumber
    }

    this.http.post(this.URL + 'ContactU/SearchContactUsByPhoneNumber', body).subscribe(R => {
      this.ListContactUs = R as [];
    })
  }
  DeleteContactUs(Id: number) {
    this.http.delete(this.URL + 'ContactU/DeleteContactUs/' + Id).subscribe(R => {
      this.toastr.success('Success');
    }, E => {
      this.toastr.warning('Error')
    })
  }

  //----------------------------------------------------------------------------------------------------------Slider
  GetAllSlider() {
    this.http.get(this.URL + 'Slider/GetAllSlider').subscribe(result => {
      this.ListSlider = result as [];
    }, error => {

    });
  }

  GetSliderById(Id :number){
    this.http.get(this.URL + 'Slider/GetSliderById/'+ Id).subscribe(result => {
      this.ListSlider = result;
      this.toastr.success('Success');
    }, error =>{
      this.toastr.warning('Error');
    })
  }

  CreateSlider(slider: Slider) {
    if (slider.SliderImg != null) {
      const formData = new FormData();

      formData.append('SliderImg', slider.SliderImg);
      this.http.post(this.URL + 'Slider/CreateSlider?SliderImg=' + slider.SliderImg + '&TitleText=' + slider.TitleText + '&BriefText=' + slider.BriefText, formData).subscribe(result => {
        this.GetAllSlider();
        this.toastr.success('Success');
      }, error => {
        this.toastr.warning('Error')
      });
    }
    else { this.toastr.warning('Make Sure Enter Image.') }
  }

  UpdateSlider(slider: Slider) {
    if (slider.SliderImg != null) {
      const formData = new FormData();
      formData.append('SliderImg', slider.SliderImg);
      this.http.put(this.URL + 'Slider/UpdateSlider?Id=' + slider.Id + '&TitleText=' + slider.TitleText + '&BriefText=' + slider.BriefText, formData).subscribe(result => {
        this.GetAllSlider();
        this.toastr.success('Success');
      }, error => {
        this.toastr.warning('Error');
      })
    }
    else {
      const formData: FormData | null = null;
      this.http.put(this.URL + 'Slider/UpdateSlider?Id=' + slider.Id + '&TitleText=' + slider.TitleText + '&BriefText=' + slider.BriefText, formData).subscribe(result => {
        this.GetAllSlider();
        this.toastr.success('Success');
      }, error => {
        this.toastr.warning('Error');
      })
    }
  }

  DeleteSlider(Id: number) {
    this.http.delete(this.URL + 'Slider/' + Id).subscribe(result => {
      this.GetAllSlider();
      this.toastr.success('Success');
    }, E => {
      this.toastr.warning('Error')
    })
  }
  //------------------------------------------------------------------------------------------------------Stock
  GetAllStock(){
    this.http.get(this.URL + 'Stock/GetAllStock').subscribe(result =>{
      this.ListStock = result as []
    }, error => {

    });
  }

  GetStockById(Id :number){
    this.http.get(this.URL + 'Stock/'+ Id).subscribe(result => {
      this.ListStock = result;
      this.toastr.success('Success');
    }, error =>{
      this.toastr.warning('Error');
    })
  }

  CreateStock(stock : Stock){
    var body = {
      ProduceDate : stock.ProduceDate,
      ExpiredDate : stock.ExpiredDate,
      ProductId : stock.ProductId,
      Quantity : stock.Quantity
    }

    this.http.post(this.URL + 'Stock/CreateStock' , body ).subscribe( reuslt =>{
      this.GetAllStock();
      this.toastr.success('Success');
    }, error =>{
      this.toastr.warning('Error');
    });
  }


  UpdateStock(stock :Stock){
    var body = {
      Id : stock.Id,
      ProduceDate : stock.ProduceDate,
      ExpiredDate : stock.ExpiredDate,
      ProductId : stock.ProductId,
      Quantity : stock.Quantity
    }

    this.http.put(this.URL + 'Stock/UpdateStock' ,body).subscribe( result =>{
      this.GetAllStock();
      this.toastr.success('Success');
    },error =>{
      this.toastr.warning('Error ')
    })
  }

  DeleteStock( id : number){
    this.http.delete(this.URL + 'Stock/' + id).subscribe(result =>{
      this.GetAllStock();
      this.toastr.success('Success');
    },error =>{
      this.toastr.warning('Error')
    })
  }




  //---------------------------------------------------------------------------------------------------------Bag
  SearchOrdersByDateAdmin(StartDate :string, EndDate : string){
    var body = {
     StartDate : StartDate,
     EndDate : EndDate
    }
    this.http.post(this.URL+'Bag/SearchOrdersByDateAdmin',body).subscribe(R=>{
      this.ListOfBags = R as [];
    })
  }

  SearchReportByDate(StartDate :string, EndDate:string){
    var body = {
      StartDate: StartDate,
      EndDate: EndDate
    }
    this.http.post(this.URL + 'Report/SearchReportByDate', body).subscribe(result=>{
      this.ListReportDetails = result as [];
      this.toastr.success('Success');
    }, error=>{
      this.toastr.warning('Error')
    });
  }
  
  GetReportDeatailsByReportId(ReportId : number){
    var body={
      
    }
    
    this.http.post(this.URL + 'Report/GetReportDeatailsByReportId/'+ReportId ,body).subscribe(result=>{
      this.ReportDetails = result;
      
      this.toastr.success('Success');
    }, error=>{
      this.toastr.warning('Error')
    });
  }
















    //---------------------------------------------------------------------------------------------------------AboutUs
    PostAboutUsText(Text : string){
      this.http.post(this.URL+'AboutUs/PostAboutUsText',{Text : Text}).subscribe(R=>{
        this.toastr.success('Success');
      })
    }
    PostAboutUsPostion(Lat : number,Long : number){
      this.http.post(this.URL+'AboutUs/PostAboutUsPostion',{Latitude : Lat,Longitude : Long}).subscribe(R=>{
        this.toastr.success('Success');
      })
    }
    PostAboutUsImage(IMG: File) {

      const formData = new FormData();
      formData.append('IMG', IMG);

  
      this.http.post(this.URL + 'AboutUs/PostAboutUsImage', formData)
        .subscribe(R => {
          this.toastr.success('Success');
        }, err => {
          this.toastr.error('Unsuccess');
        });
   }








    //---------------------------------------------------------------------------------------------------------Home
  TrendingProductByDate(StartData : Date,EndDate : Date){
    var body ={StartDate : StartData, EndDate : EndDate}
    
    this.http.post(this.URL + 'Product/TrendingProductByDate' , body).subscribe(R=>{
      this.HomeListProduct = R as any[];
    })
  } 

  TrendingBranchByDateAdmin(StartData : Date,EndDate : Date){
    var body ={StartDate : StartData, EndDate : EndDate}
    
    this.http.post(this.URL + 'Branch/TrendingBranchByDateAdmin' , body).subscribe(R=>{
      this.HomeListBranches = R as any[];      
    })
  } 

  GetActiveDeliveries(Id : number){
    var body ={Id : Number(Id)}
    
    this.http.post(this.URL + 'Bag/GetActiveDeliveries' , body).subscribe(R=>{
      this.HomeListActiveOrders = R as any[];      
    })
  }

  GetActiveDeliveriesAdmin(){

    this.http.get(this.URL + 'Bag/GetActiveDeliveriesAdmin').subscribe(R=>{
      this.HomeListActiveOrders = R as any[];      
    })
  }

}



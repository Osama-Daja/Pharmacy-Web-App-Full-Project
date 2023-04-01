using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.Core.Data.DTOInput;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutUsController : ControllerBase
    {
        private IHostingEnvironment _environment;
        public AboutUsController(IHostingEnvironment hostingEnvironment)
        {
            _environment = hostingEnvironment;
        }

        [HttpPost]
        [Route("PostAboutUsText")]
        [Authorize(Roles ="SuperUser")]
        public object PostAboutUsText(DTOInputAboutUs model)
        {


            if (!Directory.Exists(_environment.WebRootPath + "/assets/AboutUs/"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "/assets/AboutUs/");
            }

            var Location = _environment.WebRootPath + "/assets/AboutUs/Tahaluf.txt";
            if (!System.IO.File.Exists(Location))
            {
                using (FileStream NewFile = System.IO.File.Create(Location))
                {
                    var NewText = model.Text.ToArray();
                    byte[] bytes = Encoding.UTF8.GetBytes(NewText);
                    NewFile.Write(bytes, 0, bytes.Length);
                    return Ok();
                }
            }
            else
            {
                //Clear File
                System.IO.File.WriteAllText(Location, String.Empty);

                var CopyFile = new FileInfo(Location);
                using (StreamWriter Writer = CopyFile.AppendText())
                {
                    var NewText = model.Text.ToArray();
                    Writer.Write(NewText);
                    return Ok();
                }
            }
        }

        [HttpPost]
        [Route("PostAboutUsPostion")]
        [Authorize(Roles = "SuperUser")]
        public object PostAboutUsPostion(DTOInputAboutUsPostion model)
        {

            if (!Directory.Exists(_environment.WebRootPath + "/assets/AboutUs/"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "/assets/AboutUs/");
            }

            var Location = _environment.WebRootPath + "/assets/AboutUs/TahalufPostion.txt";
            if (!System.IO.File.Exists(Location))
            {
                using (FileStream NewFile = System.IO.File.Create(Location))
                {
                    var NewText = ( model.Latitude.ToString() + ","+model.Longitude.ToString()).ToArray();
                    byte[] bytes = Encoding.UTF8.GetBytes(NewText);
                    NewFile.Write(bytes, 0, bytes.Length);
                    return Ok();
                }
            }
            else
            {
                //Clear File
                System.IO.File.WriteAllText(Location, String.Empty);

                var CopyFile = new FileInfo(Location);
                using (StreamWriter Writer = CopyFile.AppendText())
                {
                    var NewText = (model.Latitude.ToString() + "," + model.Longitude.ToString()).ToArray();
                    Writer.Write(NewText);
                    return Ok();
                }
            }
        }

        [HttpPost]
        [Route("PostAboutUsImage")]
        [Authorize(Roles = "SuperUser")]
        public object PostAboutUsImage(IFormFile IMG)
        {
            string[] ExtensionForImage = { "jpeg", "jpg", "png", "svg" };

            bool Check = false;
            if (!Directory.Exists(_environment.WebRootPath + "/assets/AboutUs/"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "/assets/AboutUs/");
            }
            else
            {
                foreach(var E in ExtensionForImage)
                {
                    try
                    {
                        System.IO.File.Delete(_environment.WebRootPath + "/assets/AboutUs/Tahaluf."+E);
                        Check = true;
                    }
                    catch
                    {
                        Check = false;
                    }

                }
            }

            if (!Check) { return StatusCode(406); }

            using (FileStream filestream = System.IO.File.Create(_environment.WebRootPath + "/assets/AboutUs/Tahaluf" + Path.GetExtension(IMG.FileName).ToLower()))
            {
                IMG.CopyTo(filestream);
                return Ok();
            }
        }

        [HttpGet]
        [Route("GetAboutUs")]
        [AllowAnonymous]
        public object GetAboutUs()
        {
            string Postion = null;
            string ImagePath = null;
            string Text = null;


            try
            {
                using (StreamReader Read = new StreamReader(_environment.WebRootPath + "/assets/AboutUs/TahalufPostion.txt"))
                {
                    Postion = Read.ReadLine();
                }
            }
            catch { Postion = ""; }


            try
            {
                using (StreamReader Read = new StreamReader(_environment.WebRootPath + "/assets/AboutUs/Tahaluf.txt"))
                {
                    Text = Read.ReadLine();
                }
            }
            catch { Text = ""; }

            string[] ExtensionForImage = { "jpeg", "jpg", "png", "svg" };

            foreach(var E in ExtensionForImage)
            {
                if (System.IO.File.Exists(_environment.WebRootPath + "/assets/AboutUs/Tahaluf." + E))
                {
                    ImagePath = "assets/AboutUs/Tahaluf."+E;
                }
            }

            return new
            {
                Postion = Postion.Split(','),
                Text = Text == null ? "" : Text,
                ImagePath = ImagePath == null ? "" : ImagePath,
            };
        }
    }
}

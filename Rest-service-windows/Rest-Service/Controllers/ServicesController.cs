using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Rest_Service.Models;

namespace Rest_Service.Controllers
{
    [Route("")]
    public class ServicesController : Controller
    {
        [HttpGet("all/{name}")]
        public IEnumerable<object> Get([FromRoute]string name)
        {
            var services = ServiceController.GetServices().Where(x => Regex.IsMatch(x.DisplayName, name, RegexOptions.IgnoreCase));
            return services.Select(x => new { Name = x.DisplayName, Status = x.Status });
        }

        [HttpPost("start")]
        public void Start([FromBody]ServiceModel name)
        {
            if (!string.IsNullOrEmpty(name?.Name))
                ServiceController.GetServices().FirstOrDefault(x => x.DisplayName.ToLower() == name.Name.ToLower())?.Start();
        }

        [HttpPost("stop")]
        public void Stop([FromBody]ServiceModel name)
        {
            if (!string.IsNullOrEmpty(name?.Name))
                ServiceController.GetServices().FirstOrDefault(x => x.DisplayName.ToLower() == name.Name.ToLower())?.Stop();
        }
    }
}

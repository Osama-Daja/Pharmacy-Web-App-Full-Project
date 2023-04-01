using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace Pharmacy.Core.Connection
{
    public interface IConnection
    {
        public DbConnection DBContext {get;}
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// trida popisuje dostupnost cocek, tzv. piskvorky
/// </summary>

namespace YO
{
    public class LensGroup
    {
        public int id;//identifikator skupiny
        public string name;//jmeno skupiny
        public float diameter; //prumer cocek ve skupine
        public Lens[,] lens = new Lens[1, 1];
    }

    public class Lens
    {
        public string OPC;//unikatni kod pro kazdou cocku
        public float Cyl;//hodnota Cylindru cocky
        public float Sph;//hodnota Sfery cocky
        public float Base;//hodnota baze cocky
        public float Add;//hodnota Adice cocky
        public int Eye;//udava jestli je cocka pro prave, leve nebo obe oci
        public float Price;//cena za cocku
    }

}


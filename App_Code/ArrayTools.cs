using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using System.Web;

/// <summary>
/// Summary description for WebSystemArray
/// </summa
namespace WebSystem
{
    public class ArrayTools
    {
        public static Array ResizeArray(Array arr, int[] newSizes)
        {
            //funkce redimenzuje dvojrozmerne pole
            //volani funkce napr. myGroup.lens = (Lens[,])WebSystem.ArrayTools.ResizeArray(myGroup.lens, new int[] { 12, 2 });

            if (newSizes.Length != arr.Rank)
                throw new ArgumentException("arr must have the same number of dimensions " +
                                            "as there are elements in newSizes", "newSizes");

            var temp = Array.CreateInstance(arr.GetType().GetElementType(), newSizes);
            int length = arr.Length <= temp.Length ? arr.Length : temp.Length;
            Array.ConstrainedCopy(arr, 0, temp, 0, length);
            return temp;
        }


    }
}
using System.Collections.Generic;
using EPiServer.Shell.ObjectEditing;

namespace AlloyEpi8.Business.SelectionFactory
{
    public class ColorSelectionFactory : ISelectionFactory
    {
        public IEnumerable<ISelectItem> GetSelections(ExtendedMetadata metadata)
        {
            return new List<SelectItem>
            {
                new SelectItem { Text = "Blue", Value = "#7cb5ec"},
                new SelectItem { Text = "Black", Value = "#434348"},
                new SelectItem { Text = "Green", Value = "#90ed7d"},
                new SelectItem { Text = "Orange", Value = "#f7a35c"},
                new SelectItem { Text = "Purple", Value = "#8085e9"},
                new SelectItem { Text = "Pink", Value = "#f15c80"},
                new SelectItem { Text = "Yellow", Value = "#e4d354"},
                new SelectItem { Text = "Grey", Value = "#cccccc"},
                new SelectItem { Text = "Brown", Value = "#8d4653"},
                new SelectItem { Text = "Turquoise", Value = "#91e8e1"}
            };
        }
    }
}
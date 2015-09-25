using System;
using System.Collections.Generic;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using AlloyEpi8.Business.SelectionFactory;

namespace AlloyEpi8.Business.EditorDescriptor
{
    [EditorDescriptorRegistration(TargetType = typeof(string), UIHint = "ColorPickerEditor")]
    public class ColorPickerEditorDescriptor : EditorDescriptor
    {
        public override void ModifyMetadata(EPiServer.Shell.ObjectEditing.ExtendedMetadata metadata, IEnumerable<Attribute> attributes)
        {
			SelectionFactoryType = typeof(ColorSelectionFactory);
            ClientEditingClass = "alloy/editors/ColorPickerEditor";

            base.ModifyMetadata(metadata, attributes);
        }
    }
}
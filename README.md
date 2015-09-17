ColorPicker
=============

A dojo widget for adding a color picker to a page or block in EPiServer 8. 


Usage
-------------

**Add the code to your project:**

You may use the same folder structure as this repository. Remember to update the namespaces in the class-files, or else you'll get several build errors. 

***Module.config***

I recommend to update the widget namespace (mapping between your js-script and dojo loader configuration). 
I guess you want a different name than "alloy". After you've updated the name-tag in the module.config you must update the ClientEditingClass in MultipleImagesEditorDescriptor.cs. It's important that the namespace is in all lower-case, otherwise your widget won't be found, probably with a 404 pointing to /EPiServer/Shell/7.x.x.x/[..]. Additionally you should update the name in the declare statement in the javascript file. 


**Add property to a page or block:**

```
[UIHint("ColorPickerEditor")]
[Display(GroupName = SystemTabNames.Content, Order = 10)]
public virtual string <PropertyName> { get; set; }
```


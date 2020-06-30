
## Application Modules

https://docs.blender.org/api/blender2.8
see heading *Application Modules*

these are the nine main application modules of bpy

* **app**: contains application values that remain unchanged during runtime  
  https://docs.blender.org/api/blender2.8/bpy.app.html

* **context**: context members available depend on the area of Blender which is currently being accessed, context values are read-only  
  https://docs.blender.org/api/blender2.8/bpy.context.html

* **data**: used for all blender/python access  
  https://docs.blender.org/api/blender2.8/bpy.data.html

* **msgbus**: message bus system, can be used to receive notifications when properties of blender datablocks are changed via the data api  
  https://docs.blender.org/api/blender2.8/bpy.msgbus.html

* **ops**: provides python access to calling operators, this includes operators written in c, python or macros  
  https://docs.blender.org/api/blender2.8/bpy.ops.html

* **path**: similar scope to os.path, containing utility functions for dealing with paths in blender  
  https://docs.blender.org/api/blender2.8/bpy.path.html

* **props**: defines properties to extend blender's internal data; results of these functions used to assign properties to classes registered with blender and can't be used directly  
  https://docs.blender.org/api/blender2.8/bpy.props.html

* **types**: every data type that exists in blender  
  https://docs.blender.org/api/blender2.8/bpy.types.html

* **utils**: contains utility functions to handle custom previews; behaves as a high-level ‘cached’ previews manager
  https://docs.blender.org/api/blender2.8/bpy.utils.html


## Standalone Modules

https://docs.blender.org/api/blender2.8
see heading *Standalone Modules*

* **mathutils**: provides access to math operations  
  https://docs.blender.org/api/blender2.8/mathutils.html

* **freestyle**:  provides data types of view map components (0D and 1D elements), base classes for defining line stylization rules (predicates, functions, chaining iterators, and stroke shaders), as well as helper functions for style module writing  
  https://docs.blender.org/api/blender2.8/freestyle.html

* **bgl**: wraps opengl constants and functions, making them available from within blender python  
  https://docs.blender.org/api/blender2.8/bgl.html

* **blf**: provides access to blender text drawing functions  
  https://docs.blender.org/api/blender2.8/blf.html

* **imbuf**: provides access to blender image manipulation api  
  https://docs.blender.org/api/blender2.8/imbuf.html

* **gpu**: provides python wrappers for the gpu implementation in blender  
  https://docs.blender.org/api/blender2.8/gpu.html

* **gpu_extras**: gpu utilities  
  https://docs.blender.org/api/blender2.8/gpu_extras.html

* **aud**: audaspace (pronounced "outer space") is a high level audio library  
  https://docs.blender.org/api/blender2.8/aud.html

* **bpy_extras**: extra utilities  
  https://docs.blender.org/api/blender2.8/bpy_extras.html

* **idprop.types**: id property access  
  https://docs.blender.org/api/blender2.8/idprop.types.html

* **bmesh**: provides access to blenders bmesh data structures  
  https://docs.blender.org/api/blender2.8/bmesh.html

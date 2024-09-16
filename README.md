Existen cambios personalizados en dependencias de terceros para tomar en cuenta
para esta version de react-native(0.75.2):

"react-native-reanimated": "^3.15.1":
En la documentacion de esta version menciona de configurar nuestro metro.config.js:
"Step 3: Wrap metro config with reanimated wrapper (recommended)
Wrap your existing Metro configuration in the metro.config.js file with the wrapWithReanimatedMetroConfig function."
Pero el problema fue que no se descargaban los siguientes archivos de la libreria(no se si es debido a yarn o la misma libreria).
La solucion fue buscar los archivos en el github de la dependencia y insertarlo manualmente en nuestro node_modules:
node_modules/react-native-reanimated/metro-config
node_modules/react-native-reanimated/tsconfig.json

Los archivos de la dependencia los pueden encontrar en esta ruta de este proyecto(para backup):
src/customBackup/node_modules/react-native-reanimated-3.15.1


"react-native-tab-view": "^3.5.2" (esta dependencia tiene relacion con @react-navigation)
En este caso, metro nos daba el siguiente error:
"Warning: A props object containing a "key" prop is being spread into JSX.
  <TabBarItem {...props} />
React keys must be passed directly to JSX without using spread
  <TabBarItem key={someKey} {...props} />
    in CellRenderer (created by VirtualizedList)

Se realizaron estos cambios en node_modules/react-native-tab-view/src/TabBar.tsx y funciona correctamente:
https://github.com/react-navigation/react-navigation/issues/11989#issuecomment-2113658902

Pueden encontrar el archivo(para backup) ya modificado en este proyecto:
src/customBackup/node_modules/react-native-tab-view-3-5-2/src/TabBar.tsx

En caso de remover toda la carpeta de node_modules ya sea para limpiar cache u otro motivo, deben copiar estos archivos de la carpeta de back-up e insertarlos en la carpeta y ruta de node_modules correspientes.

Si los desarrolladores de las dependencias solucionaros estos problemas en actualizaciones recientes, ya no sera necesario guardar los archivos en backup(eliminarlos de ser asi).
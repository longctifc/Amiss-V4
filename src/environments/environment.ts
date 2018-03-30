// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://amosi.amiss.com.vn/SERVICE/api/ExcuteOracle',
  apiUrl: 'http://localhost:50001/',
  // apiUrl:"http://localhost:14648/api/ExcuteOracle",
  // apiUrl:"http://amiss4.ifc.com.vn:1005/ServiceAmiss4/",
  localUserName: "UserInfo"
};

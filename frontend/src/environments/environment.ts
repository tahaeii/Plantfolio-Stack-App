// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiAddress: "http://87.236.166.196:8001/api/", //FAKE API: https://jsonplaceholder.typicode.com/todos/1
  imageBaseUrl: "http://87.236.166.182:8000",
  addSpace: false,
  defaultPaginationNode: "",
  mobileResponsive: true,
  customBtnClass: "btn-soft-primary ",
  isRTL: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
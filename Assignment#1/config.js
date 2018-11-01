/**
 * 
 * Server environments configuration file
 * 
 */

 var environments = {};

 environments.staging = {
    httpPort: 4000,
    envName: 'staging'
 }

 environments.production = {
    httpPort : 5000,
    envName: 'production'
 }

 var workingEnvironment = typeof(process.env.NODE_ENV) !== 'undefined' ? environments[process.env.NODE_ENV] : environments['staging'];

 module.exports = workingEnvironment;
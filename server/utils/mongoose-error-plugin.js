module.exports = function(schema, options) {
  schema.post(
    [
      "findById",
      "findOne",
      "find",
      "aggregate",
      "findOneAndUpdate",
      "findByIdAndUpdate",
      // "findRandom",
      // "validate",
      // "save",
      "findOneAndDelete",
      "updateMany",
      "exists"
    ],
    { query: true },
    function(res, next) {
      if (!res) {
        let errorRes = {
          error: new Error(),
          name: "Document Not Found",
          message:
            "Document has not been found/a null object has been returned.",
          path: undefined,
          kind: undefined,
          value: undefined,
          reason: undefined,
          //   model: undefined,
          type: undefined,
          filters: this._conditions
        };
        return next(errorRes);
      } else {
        return next();
      }
    }
  );

  schema.post(
    [
      "findById",
      "findOne",
      "find",
      "aggregate",
      "findOneAndUpdate",
      "findByIdAndUpdate",
      // "findRandom",
      "updateOne",
      "validate",
      // "save",
      "findOneAndDelete",
      "updateMany",
      "exists"
    ],
    function(error, res, next) {
      // OPTIONAL DEBUGGER OPTION: UNCOMMENT FOR FULL ERROR PRINT
      // console.log(error);
      if (error.errors) {
        console.log();
        console.log(
          "-----------------------------------------------------------------------------------"
        );
        console.log(
          "1.This error message has been printed from the plugin. For full error, details, \nuncomment line 56 in /server/utils/mongoose-plugin.js. If a value is undefined, then \nthe error received did not contain that property."
        );
        let errorKeys = Object.keys(error.errors);
        errorKeys.forEach(errorKey => {
          let reason;
          if (error.errors[errorKey].reason) {
            reason = error.errors[errorKey].reason.message;
          } else {
            reason = undefined;
          }
          console.log(
            "------- Error: -------------------------------------------------------------------"
          );
          console.log();
          console.log("         Name: ", error.errors[errorKey].name);
          console.log("         Message: ", error.errors[errorKey].message);
          console.log("         Path: ", error.errors[errorKey].path);
          console.log("         Kind: ", error.errors[errorKey].kind);
          console.log("         Value: ", error.errors[errorKey].value);
          console.log("         Reason: ", reason);
          // console.log("             Model: ", error.model);
          console.log("         Type: ", error.errors[errorKey].type);
          console.log("         Filters: ", error.errors[errorKey].filters);
          console.log();
          console.log(
            "-----------------------------------------------------------------------------------"
          );
          console.log();
        });

        if (error.errors[errorKeys[0]].reason) {
          reason = error.errors[errorKeys[0]].reason.message;
        } else {
          reason = undefined;
        }
        let errorRes = {
          error: new Error(),
          name: error.errors[errorKeys[0]].name,
          message: error.errors[errorKeys[0]].message,
          path: error.errors[errorKeys[0]].path,
          kind: error.errors[errorKeys[0]].kind,
          value: error.errors[errorKeys[0]].value,
          reason: reason,
          //   model: error.model,
          type: error.errors[errorKeys[0]].type,
          filters: error.errors[errorKeys[0]].filters,
          additional: undefined
        };
        next(errorRes);
        // --------------------------------------------------------------------------------------------------
      } else if (error) {
        let reason;
        if (error.reason) {
          reason = error.reason.message;
        } else {
          reason = undefined;
        }
        console.log();
        console.log(
          "-----------------------------------------------------------------------------------"
        );
        console.log(
          "2.This error message has been printed from the plugin. For full error, details, \nuncomment line 56 in /server/utils/mongoose-plugin.js. If a value is undefined, then \nthe error received did not contain that property."
        );
        console.log(
          "------- Error: -------------------------------------------------------------------"
        );
        console.log();
        console.log("         Name: ", error.name);
        console.log("         Message: ", error.message);
        console.log("         Path: ", error.path);
        console.log("         Kind: ", error.kind);
        console.log("         Value: ", error.value);
        console.log("         Reason: ", reason);
        // console.log("             Model: ", error.model);
        console.log("         Type: ", error.type);
        console.log("         Filters: ", error.filters);
        console.log();
        console.log(
          "-----------------------------------------------------------------------------------"
        );
        console.log();

        let errorRes = {
          error: new Error(),
          name: error.name,
          message: error.message,
          path: error.path,
          kind: error.kind,
          value: error.value,
          reason: reason,
          //   model: error.model,
          type: error.type,
          filters: error.filters,
          additional: undefined
        };
        next(errorRes);
      } else {
        console.log(error);
      }
    }
  );
};

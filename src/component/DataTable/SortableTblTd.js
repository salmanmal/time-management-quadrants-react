import React from "react";
const SortableTblTd = props => {
  let CustomTd = props.customTd;
  let customTdClass = props.customTdClass;
  return (
    <tr>
      {props.dKey.map((item, id) => {
        let CustomTdComponent = null;
    
        CustomTdComponent =
          CustomTd &&
          CustomTd.filter(i => {
            return i.keyItem === item;
          }).reduce((result, item) => {
            return item;
          }, {}).custd;

		  let customTdClassName = null;
        customTdClassName =
          customTdClass &&
          customTdClass
            .filter(i => {
				return i.keyItem === item;
            })
            .reduce((result, item) => {
              return item;
            }, {}).custClass;
        if (!CustomTd)
          return (
            <td
              key={id}
              className={customTdClassName ? `${customTdClassName}`:''}
            >
              {props.tdData[item]}
            </td>
          );

        if (CustomTdComponent) {
          return (
            <td
              key={id}
              className={customTdClassName ? `${customTdClassName}`:''}
            >
              <CustomTdComponent
                key={id}
                {...props}
                tdData={props.tdData[item]}
                field={item}
                rowData={props.tdData}
              />
            </td>
          );
        }

        return (
		  <td key={id} 
		  className={customTdClassName ? `${customTdClassName}`:''}
		  >
            {props.tdData[item]}
          </td>
        );
      })}
    </tr>
  );
};

export { SortableTblTd };

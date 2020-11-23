import React from "react";
class SortableTblTh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortCssClass: "fa fa-sort"
    };
    this.sort = this.sort.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    //constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
    let a = "fas fa-sort";
    switch (nextProps.asc) {
      case null:
        a = "fas fa-sort";
        break;
      case true:
        a = "fas fa-sort-amount-up";
        break;
      case false:
        a = "fas fa-sort-amount-down";
        break;
    }
    //console.log(a);
    if (nextProps.asc !== this.props.asc) {
      this.setState({ sortCssClass: a });
    }
  }
  sort() {
    if (
      !(
        this.props.disableSorting &&
        this.props.disableSorting.indexOf(this.props.dataKey) >= 0
      )
    ) {
      this.props.sortData(this.props.dataKey, !this.props.asc);
    }
  }
  render() {
    let customTdClass = this.props.customTdClass;
    let customTdClassName = null;
    customTdClassName =
      customTdClass &&
      customTdClass
        .filter(i => {
          return i.keyItem === this.props.dataKey;
        })
        .reduce((result, item) => {
          return item;
        }, {}).custClass;
    return (
      <th
        onClick={this.sort}
        className={customTdClassName ? `${customTdClassName}` : ""}
      >
        {" "}
        {this.props.children} <br />
        {this.props.disableSorting ? (
          this.props.disableSorting.indexOf(this.props.dataKey) >= 0 ? (
            ""
          ) : (
            <i className={this.state.sortCssClass} aria-hidden="true" />
          )
        ) : (
          <i className={this.state.sortCssClass} aria-hidden="true" />
        )}
      </th>
    );
  }
}

export { SortableTblTh };

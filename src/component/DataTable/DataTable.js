import React from 'react';
import SortableTbl from './SortableTbl';
import './DataTable.scss';

class DataTable extends React.Component {

    render() {

        let col = this.props.col;
        let tHead = this.props.tHead;
        let TableData = this.props.tableData;
        let customTdList = this.props.customTdList;//[{keyItem:'Action',custd:Action}]
        let customTdClassList=this.props.customTdClassList;//[{keyItem:'column_name',custClass:'class_name'}]
        let disableSorting = this.props.disableSorting;
        let defaultRowsPerPage=this.props.defaultRowsPerPage;
        let search=this.props.search;
        let containerClassName=this.props.containerClassName;
        let tableId=this.props.tableId;
        
        return (
            <div className={`data-table-container ${containerClassName&&containerClassName}`}>
                <SortableTbl
                    tblData={TableData}
                    tHead={tHead}
                    customTd={customTdList}
                    customTdClass={customTdClassList}
                    dKey={col}
                    defaultRowsPerPage={defaultRowsPerPage?defaultRowsPerPage:20}
                    defaultCSS={false}
                    disableSorting={disableSorting ? disableSorting : []}
                    search={search?search:true}
                    tableId={tableId}
                    {...this.props}
                />
            </div>
        );
    }
}

export default DataTable;



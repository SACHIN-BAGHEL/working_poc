import React, { Component } from 'react'
import {
    Grid,
    Row,
    Col,
    Button,
    PaginationRow
} from 'patternfly-react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { LASTPAGE, NAME, PAGE, PAGECHANGEVALUE, PAGEINPUT, PAGESIZE, PERPAGEOPTIONS, SEARCH_CONTENT_BY_NAME, SELECT_COLLECTION_TYPE, TOTALITEMS, T_HEADING } from '../helper/Constant';
import { Link } from 'react-router-dom';
import ContentDetailModal from '../ui/ContentDetailModal';
import { filterContentsByName, getCollectionTypes, getContents } from '../api/Api';

export default class SingleContentList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: PAGE,
      currPageWillUpdating: 1,
      pageSize: PAGESIZE,
      totalItems: TOTALITEMS,
      lastPage: LASTPAGE,
      pageInput: PAGEINPUT,
      pageChangeValue: PAGECHANGEVALUE,
      show: false,
      searchQuery: '',
      setSearchBy: '',
      // DATA STATE
      collectionType: [],
      selectedCollectionType: [],
      contents: [],
      selectedContent: null
    }
  }

  componentDidMount = async () => {
    await this.setCollectionTypeState();
  }
  
  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.selectedCollectionType !== this.props.selectedCollectionType ||
      prevState.pageSize !== this.state.pageSize) {
      // await this.getTemplates(this.props.selectedCollectionType, true).then(res => {
      //   if (this.state.contents.length) {
      //     this.setState({ currPageWillUpdating: PAGE })
      //   } else {
      //     this.setState({ currPageWillUpdating: 0 })
      //   }
      // });
    }
    if (prevState.page !== this.state.page) {
      this.setState({ selectedContent: null });
      await this.getContentsByCollectionType(this.state.selectedCollectionType[0].label, this.state.page, this.state.pageSize);
    }
  }

  async setCollectionTypeState() {
    const { data: collectionTypeData } = await getCollectionTypes();
    const collectionTypeApiData = this.filterUidByApiPrefix(collectionTypeData);
    this.setState({ collectionType: collectionTypeApiData.map(el => ({ label: el.info.singularName })) });
  }

  filterUidByApiPrefix = (collectionTypeData) => {
    return collectionTypeData.filter(el => el.uid.startsWith('api::'))
  }

  open = async () => {
    this.setState({ show: true })
    // Commented for now..
    // let contentTypes = await getContents("Sample-about-uses");
    // this.setState({ collectionAttributes: dummyData })
  }

  close = () => {
    this.setState({ show: false })
  }

  handleCollectionTypeChange = async (collectionType) => {
    const collType = collectionType[0]
    this.setState({ selectedCollectionType: collectionType })
    collType && collType.label && await this.getContentsByCollectionType(collType.label)
  }

  getContentsByCollectionType = async (collectionType, page, pageSize) => {
    const contentData = await getContents(collectionType, page, pageSize);
    this.setState({
      contents: contentData.results,
      lastPage: contentData.pagination.pageCount,
      page: contentData.pagination.page,
      pageSize: contentData.pagination.pageSize,
      totalItems: contentData.pagination.total,
      setSearchBy: contentData && contentData.results.length && Object.keys(contentData.results[0])[1]
    });
  }

  /**
   * Renders Button on Typehead.
   * @returns Button element
   */
  renderToggleButton = ({ isMenuShown, onClick }) => (
    <button
      type="button"
      style={{ position: "absolute", height: "100%", top: "0px", right: "0px", border: "1px solid lightgray" }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    ><span className="fa fa-angle-down"></span></button>
  );

  changePage(page) {
    this.setState({ page: page, currPageWillUpdating: page })
  }

  setPage = value => {
    const page = Number(value);
    if (
      !Number.isNaN(value) &&
      value !== '' &&
      page > 0 &&
      page <= this.totalPages()
    ) {
      let newPaginationState = Object.assign({}, this.state.pagination);
      newPaginationState.page = page;
      this.setState({ pagination: newPaginationState, pageChangeValue: page });
    }
  }

  onContentSearch = async (e) => {
    e.preventDefault();
    // collectionType, query, searchBy
    if (this.state.searchQuery) {
      const searchResult = await filterContentsByName(
        this.state.selectedCollectionType[0].label, 
        this.state.searchQuery, this.state.setSearchBy, PAGE, PAGESIZE
      );
      this.setState({
        contents: searchResult.results,
        lastPage: searchResult.pagination.pageCount,
        page: searchResult.pagination.page,
        pageSize: searchResult.pagination.pageSize,
        totalItems: searchResult.pagination.total,
      })
    } else {
      this.getContentsByCollectionType(this.state.selectedCollectionType[0].label)
    }
  }

  handleQueryChange = (e) => {
    e.preventDefault();
    this.setState({ searchQuery: e.target.value })
  }

  render() {
    const pagination = {
      page: this.state.page,
      perPage: this.state.pageSize,
      perPageOptions: PERPAGEOPTIONS,
    };
    const itemsStart = this.state.totalItems === 0 ? 0 : ((this.state.page - 1) * this.state.pageSize) + 1;
    const itemsEnd = Math.min(this.state.page * this.state.pageSize, this.state.totalItems);

    return (
      <Grid>
        <Row className="mt-2">
          <Col lg={12}>
            <legend>
              Select Content
            </legend>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col lg={3}>
            <h6><b>{SELECT_COLLECTION_TYPE}</b></h6>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <Typeahead
              id="collectionTypeDropdown"
              placeholder={SELECT_COLLECTION_TYPE}
              options={this.state.collectionType}
              onChange={this.handleCollectionTypeChange}
              selected={this.state.selectedCollectionType}
            >
              {({ isMenuShown, toggleMenu }) => (
                this.renderToggleButton({ isMenuShown, onClick: toggleMenu })
              )}
            </Typeahead>
          </Col>
        </Row>
        {
          Object.keys(this.state.selectedCollectionType).length > 0 &&
          <>
            <Row className="mt-2">
              <Col lg={3}>
                <h5 style={{ marginBottom: "0px" }}><strong>Article</strong></h5>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div
                  className="ContentsFilter well"
                  role="button"
                  tabIndex={0}
                  style={{ margin: '1rem 0rem' }}
                >
                  <form >
                    <div style={{ display: 'flex', margin: '1rem 0rem' }}>
                      <button id="dropdown-example" role="button" aria-haspopup="true" aria-expanded="false" type="button" className="dropdown-toggle btn btn-default">{NAME}</button>
                      <input
                        type="search"
                        name="name"
                        // value={this.state.values.name}
                        onChange={this.handleQueryChange}
                        role="combobox"
                        className="rbt-input-main form-control rbt-input"
                        placeholder={SEARCH_CONTENT_BY_NAME}
                      />
                    </div>
                    <div className="pull-right mbt10" style={{ margin: "0 0 10px 0" }} >
                      <button className="btn btn-primary" onClick={this.onContentSearch}>Search</button>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={12}>
                <table className="table dataTable table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      {Object.keys(T_HEADING).map(el => <th key={el}>{T_HEADING[el]}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.contents.map(content => {
                      return (
                        <tr key={content.id} onClick={this.open} className="rowCursorPointer">
                          <td width="5%" align="center">
                            <input onClick={() => {this.props.getData(content); this.setState({ selectedContent: content })}} type="radio" id="age3" name="age" value="100" />
                          </td>
                          <td>{content[Object.keys(content)[1]]}</td>
                          <td>{`${content.createdBy.firstname} ${content.createdBy.lastname}`}</td>
                          <td>{content.publishedAt}</td>
                          <td>{content.updatedAt}</td>
                        </tr>)
                    })}
                  </tbody>
                </table>
                <div className="custom-page"></div>
                <PaginationRow
                  itemCount={this.state.totalItems}
                  itemsStart={itemsStart}
                  itemsEnd={itemsEnd}
                  viewType="table"
                  pagination={pagination}
                  amountOfPages={this.state.lastPage}
                  pageInputValue={this.state.currPageWillUpdating}
                  onPageSet={this.changePage}
                  onPerPageSelect={this.onPerPageSelect}
                  onFirstPage={() => this.changePage(1)}
                  onPreviousPage={() => this.changePage(this.state.page - 1)}
                  onPageInput={this.onPageInput}
                  onNextPage={() => this.changePage(this.state.page + 1)}
                  onLastPage={() => this.changePage(this.state.lastPage)}
                  onSubmit={this.onSubmit}
                // messages={messages} i18n
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={9}>
              </Col>
              <Col lg={3} className="SingleContentConfigFormBody__addButtons">
                <Link to="/">
                  <button className="btn-default btn">Cancel</button>
                  <button className="btn-primary btn AddContentTypeFormBody__save--btn" disabled={!this.state.selectedContent}>Save</button>
                </Link>
              </Col>
            </Row>
          </>
        }
        <ContentDetailModal show={this.state.show} onHide={this.close} dummyData={dummyData} />
      </Grid>
    )
  }
}

// TODO: need to remove later
export const dummyData = {
  "Title": "About Us",
  "Subtitle": "By integrating leading edge open source projects and extending their capabilities, Entando allows developers and operations teams to create modern UX on Kubernetes.",
  "Abstract": "Entando is an open source software company providing the leading micro frontend platform building enterprise web apps on Kubernetes. The company, founded in 2010 as an open-source system integrator, was re-founded as a product company in 2015 in response to the growing demand for tools and services to create modern online experiences. Since then, Entando has stepped into international markets. It’s headquartered in San Diego, California with R&D and sales offices in Europe, and features teams all over the world, including the United States, Italy, Brazil, South Africa, Georgia and the Philippines.\nIn 2015, Entando was named in the “Cool Vendors in Web Computing” Gartner report. In 2017, it became an official Red Hat Technology Partner, followed in 2018 by an OEM agreement with Red Hat. Also in 2018 the platform won the Digital360 Awards prize in the cloud computing category.\n",
  "createdAt": "2022-03-14T05:45:10.607Z",
  "updatedAt": "2022-05-02T07:43:44.378Z",
  "publishedAt": "2022-03-14T05:45:13.766Z",
  "Test": "Testing"
}
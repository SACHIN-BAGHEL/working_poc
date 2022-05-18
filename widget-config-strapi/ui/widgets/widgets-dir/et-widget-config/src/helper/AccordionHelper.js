import { PanelGroup, Panel, Row } from 'react-bootstrap';
import { STRAPI_EXCLUDE_KEYS, STRAPI_IMAGE_EXTENSIONS, STRAPI_IMAGE_HEIGHT, STRAPI_IMAGE_URL_KEY, STRAPI_IMAGE_WIDTH } from './Constant';

let panelGroupId = 1;

export const renderPanelGroup = (data) => {
    panelGroupId = panelGroupId + 1;
    return (
        <PanelGroup accordion id={panelGroupId} style={{ marginBottom: '5px' }}>
            {data && Object.keys(data).length > 0
                ?
                isImageObject(data)
                    ?
                    renderPanel(STRAPI_IMAGE_URL_KEY, 0, data[STRAPI_IMAGE_URL_KEY])
                    :
                    Object.keys(data).filter(key => ignoreProps(key)).map((key, index) => {
                        let keyToShow;
                        if (key && (Number(key) || Number(key) === 0)) {
                            keyToShow = Number(key) + 1;
                            keyToShow = keyToShow.toString();
                        } else {
                            keyToShow = key;
                        }
                        return (renderPanel(keyToShow, index, data[key]));
                    })
                :
                <span>No data available</span>}
        </PanelGroup>
    )
}

const renderPanel = (theKey, theIndex, data) => {
    return (
        <Panel eventKey={theIndex} key={theIndex}>
            {renderPanelHeading(theKey, data)}
            {
                isObject(data)
                &&
                renderPanelBody(data, true)
            }
        </Panel>)
}

const renderPanelHeading = (theKey, data) => {
    return (
        <Panel.Heading>
            {isObject(data) && !isImageObject(data)
                ?
                renderPanelTitleToggle(theKey)
                :
                renderPanelTitle(theKey, data)}
        </Panel.Heading>
    );
}

const renderPanelTitle = (theKey, data) => {
    return (
        <Panel.Title style={{ wordBreak: 'break-word' }}>
            <span style={{ marginLeft: '15px' }}>
                <strong>
                    {isImageObject(data) && isKey0To9(theKey)
                        ?
                        'Photo' + ' ' + theKey.charAt(0).toUpperCase() + theKey.slice(1) + ': '
                        :
                        theKey.charAt(0).toUpperCase() + theKey.slice(1) + ': '}
                </strong>


                {
                    isImageObject(data)
                        ?
                        renderAccordionData(data[STRAPI_IMAGE_URL_KEY.toLowerCase()])
                        :
                        renderAccordionData(data)}
            </span>
        </Panel.Title>
    );
}

const renderPanelTitleToggle = (theKey) => {
    return (
        <Panel.Title toggle>
            <span><strong>{theKey.charAt(0).toUpperCase() + theKey.slice(1)}</strong></span>
        </Panel.Title>
    );
}

const renderPanelBody = (data, isObject) => {
    if (isObject) {
        return (
            <Panel.Body collapsible>
                {renderPanelGroup(data)}
            </Panel.Body>
        )
    } else {
        return (
            <Panel.Body collapsible>
                <span>{data}</span>
            </Panel.Body>
        )
    }
}

const renderAccordionData = (data) => {
    if (data === null || data === undefined) {
        return <span> - </span>
    } else if (typeof data === 'boolean') {
        return <span>{data.toString()}</span>
    } else if (typeof data === 'string') {
        if (endsWithAnyImageExtension(data)) {
            return <img src={process.env.REACT_APP_STRAPI_API_URL + data} width={STRAPI_IMAGE_WIDTH} height={STRAPI_IMAGE_HEIGHT} alt='image' />
        }
        return <span>{data}</span>;
    } else if (typeof data === 'number') {
        return <span>{data}</span>;
    } else if (typeof data === 'object') {
        return data;
    } else {
        return <span> - </span>;
    }
}

const endsWithAnyImageExtension = (string) => {
    for (let suffix of STRAPI_IMAGE_EXTENSIONS)
        if (string.toUpperCase().endsWith(suffix))
            return true;
    return false;
}

const isObject = (data) => {
    if (data) {
        if (typeof data === 'object') {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const isImageObject = (object) => {
    let keys = object && Object.keys(object);
    if (keys && keys.includes('ext') && keys.includes('formats') && keys.includes('url')) {
        if (STRAPI_IMAGE_EXTENSIONS.includes(object['ext'].toUpperCase())) {
            return true;
        }
    }
    return false;
}

const isKey0To9 = (key) => {
    if (key && Number(key) && Number(key) >= 0) {
        return true;
    } return false;
}

const ignoreProps = (key) => {
    return !STRAPI_EXCLUDE_KEYS.includes(key);
}
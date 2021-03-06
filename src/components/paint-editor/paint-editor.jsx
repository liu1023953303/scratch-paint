import paper from '@scratch/paper';
import classNames from 'classnames';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';

import PaperCanvas from '../../containers/paper-canvas.jsx';

import BitBrushMode from '../../containers/bit-brush-mode.jsx';
import BitLineMode from '../../containers/bit-line-mode.jsx';
import BitOvalMode from '../../components/bit-oval-mode/bit-oval-mode.jsx';
import BitRectMode from '../../containers/bit-rect-mode.jsx';
import BitTextMode from '../../components/bit-text-mode/bit-text-mode.jsx';
import BitFillMode from '../../containers/bit-fill-mode.jsx';
import BitEraserMode from '../../containers/bit-eraser-mode.jsx';
import BitSelectMode from '../../components/bit-select-mode/bit-select-mode.jsx';
import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import ButtonGroup from '../button-group/button-group.jsx';
import BrushMode from '../../containers/brush-mode.jsx';
import EraserMode from '../../containers/eraser-mode.jsx';
import FillColorIndicatorComponent from '../../containers/fill-color-indicator.jsx';
import FillMode from '../../containers/fill-mode.jsx';
import InputGroup from '../input-group/input-group.jsx';
import LineMode from '../../containers/line-mode.jsx';
import Loupe from '../loupe/loupe.jsx';
import FixedToolsComponent from '../fixed-tools/fixed-tools.jsx';
import ModeToolsContainer from '../../containers/mode-tools.jsx';
import OvalMode from '../../containers/oval-mode.jsx';
import RectMode from '../../containers/rect-mode.jsx';
import ReshapeMode from '../../containers/reshape-mode.jsx';
import SelectMode from '../../containers/select-mode.jsx';
import StrokeColorIndicatorComponent from '../../containers/stroke-color-indicator.jsx';
import StrokeWidthIndicatorComponent from '../../containers/stroke-width-indicator.jsx';
import TextMode from '../../containers/text-mode.jsx';

import Formats from '../../lib/format';
import {isBitmap, isVector} from '../../lib/format';
import styles from './paint-editor.css';

import bitmapIcon from './icons/bitmap.svg';
import zoomInIcon from './icons/zoom-in.svg';
import zoomOutIcon from './icons/zoom-out.svg';
import zoomResetIcon from './icons/zoom-reset.svg';

const messages = defineMessages({
    bitmap: {
        defaultMessage: 'Convert to Bitmap',
        description: 'Label for button that converts the paint editor to bitmap mode',
        id: 'paint.paintEditor.bitmap'
    },
    vector: {
        defaultMessage: 'Convert to Vector',
        description: 'Label for button that converts the paint editor to vector mode',
        id: 'paint.paintEditor.vector'
    }
});

const PaintEditorComponent = props => (
    <div className={styles.editorContainer}>
        {props.canvas !== null ? ( // eslint-disable-line no-negated-condition
            <div className={styles.editorContainerTop}>
                {/* First row */}
                <div className={styles.row}>
                    <FixedToolsComponent
                        canRedo={props.canRedo}
                        canUndo={props.canUndo}
                        name={props.name}
                        onGroup={props.onGroup}
                        onRedo={props.onRedo}
                        onSendBackward={props.onSendBackward}
                        onSendForward={props.onSendForward}
                        onSendToBack={props.onSendToBack}
                        onSendToFront={props.onSendToFront}
                        onUndo={props.onUndo}
                        onUngroup={props.onUngroup}
                        onUpdateImage={props.onUpdateImage}
                        onUpdateName={props.onUpdateName}
                    />
                </div>
                {/* Second Row */}
                {isVector(props.format) ?
                    <div className={styles.row}>
                        <InputGroup
                            className={classNames(
                                styles.row,
                                styles.modDashedBorder,
                                styles.modLabeledIconHeight
                            )}
                        >
                            {/* fill */}
                            <FillColorIndicatorComponent
                                className={styles.modMarginRight}
                                onUpdateImage={props.onUpdateImage}
                            />
                            {/* stroke */}
                            <StrokeColorIndicatorComponent
                                onUpdateImage={props.onUpdateImage}
                            />
                            {/* stroke width */}
                            <StrokeWidthIndicatorComponent
                                onUpdateImage={props.onUpdateImage}
                            />
                        </InputGroup>
                        <InputGroup className={styles.modModeTools}>
                            <ModeToolsContainer
                                onUpdateImage={props.onUpdateImage}
                            />
                        </InputGroup>
                    </div> :
                    isBitmap(props.format) ?
                        <div className={styles.row}>
                            <InputGroup
                                className={classNames(
                                    styles.row,
                                    styles.modDashedBorder,
                                    styles.modLabeledIconHeight
                                )}
                            >
                                {/* fill */}
                                <FillColorIndicatorComponent
                                    className={styles.modMarginRight}
                                    onUpdateImage={props.onUpdateImage}
                                />
                            </InputGroup>
                            <InputGroup className={styles.modModeTools}>
                                <ModeToolsContainer
                                    onUpdateImage={props.onUpdateImage}
                                />
                            </InputGroup>
                        </div> : null
                }
            </div>
        ) : null}

        <div className={styles.topAlignRow}>
            {/* Modes */}
            {props.canvas !== null ? ( // eslint-disable-line no-negated-condition
                <div className={isVector(props.format) ? styles.modeSelector : styles.hidden}>
                    <SelectMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <ReshapeMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <BrushMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <EraserMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <FillMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <TextMode
                        textArea={props.textArea}
                        onUpdateImage={props.onUpdateImage}
                    />
                    <LineMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <OvalMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <RectMode
                        onUpdateImage={props.onUpdateImage}
                    />
                </div>
            ) : null}
            
            {props.canvas !== null ? ( // eslint-disable-line no-negated-condition
                <div className={isBitmap(props.format) ? styles.modeSelector : styles.hidden}>
                    <BitBrushMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <BitLineMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <BitOvalMode />
                    <BitRectMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <BitTextMode />
                    <BitFillMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <BitEraserMode
                        onUpdateImage={props.onUpdateImage}
                    />
                    <BitSelectMode />
                </div>
            ) : null}
            
            <div>
                {/* Canvas */}
                <div
                    className={classNames(
                        styles.canvasContainer,
                        {[styles.withEyeDropper]: props.isEyeDropping}
                    )}
                >
                    <PaperCanvas
                        canvasRef={props.setCanvas}
                        image={props.image}
                        imageFormat={props.imageFormat}
                        imageId={props.imageId}
                        rotationCenterX={props.rotationCenterX}
                        rotationCenterY={props.rotationCenterY}
                        onUpdateImage={props.onUpdateImage}
                    />
                    <textarea
                        className={styles.textArea}
                        ref={props.setTextArea}
                        spellCheck={false}
                    />
                    {props.isEyeDropping &&
                        props.colorInfo !== null &&
                        !props.colorInfo.hideLoupe ? (
                            <Box className={styles.colorPickerWrapper}>
                                <Loupe
                                    colorInfo={props.colorInfo}
                                    pixelRatio={paper.project.view.pixelRatio}
                                />
                            </Box>
                        ) : null
                    }
                </div>
                <div className={styles.canvasControls}>
                    {isVector(props.format) ?
                        <Button
                            className={styles.bitmapButton}
                            onClick={props.onSwitchToBitmap}
                        >
                            <img
                                className={styles.bitmapButtonIcon}
                                draggable={false}
                                src={bitmapIcon}
                            />
                            <span className={styles.buttonText}>
                                {props.intl.formatMessage(messages.bitmap)}
                            </span>
                        </Button> :
                        isBitmap(props.format) ?
                            <Button
                                className={styles.bitmapButton}
                                onClick={props.onSwitchToVector}
                            >
                                <img
                                    className={styles.bitmapButtonIcon}
                                    draggable={false}
                                    src={bitmapIcon}
                                />
                                <span className={styles.buttonText}>
                                    {props.intl.formatMessage(messages.vector)}
                                </span>
                            </Button> : null
                    }
                    {/* Zoom controls */}
                    <InputGroup className={styles.zoomControls}>
                        <ButtonGroup>
                            <Button
                                className={styles.buttonGroupButton}
                                onClick={props.onZoomOut}
                            >
                                <img
                                    alt="Zoom Out"
                                    className={styles.buttonGroupButtonIcon}
                                    draggable={false}
                                    src={zoomOutIcon}
                                />
                            </Button>
                            <Button
                                className={styles.buttonGroupButton}
                                onClick={props.onZoomReset}
                            >
                                <img
                                    alt="Zoom Reset"
                                    className={styles.buttonGroupButtonIcon}
                                    draggable={false}
                                    src={zoomResetIcon}
                                />
                            </Button>
                            <Button
                                className={styles.buttonGroupButton}
                                onClick={props.onZoomIn}
                            >
                                <img
                                    alt="Zoom In"
                                    className={styles.buttonGroupButtonIcon}
                                    draggable={false}
                                    src={zoomInIcon}
                                />
                            </Button>
                        </ButtonGroup>
                    </InputGroup>
                </div>
            </div>
        </div>
    </div>
);

PaintEditorComponent.propTypes = {
    canRedo: PropTypes.func.isRequired,
    canUndo: PropTypes.func.isRequired,
    canvas: PropTypes.instanceOf(Element),
    colorInfo: Loupe.propTypes.colorInfo,
    format: PropTypes.oneOf(Object.keys(Formats)),
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(HTMLImageElement)
    ]),
    imageFormat: PropTypes.string,
    imageId: PropTypes.string,
    intl: intlShape,
    isEyeDropping: PropTypes.bool,
    name: PropTypes.string,
    onGroup: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onSendBackward: PropTypes.func.isRequired,
    onSendForward: PropTypes.func.isRequired,
    onSendToBack: PropTypes.func.isRequired,
    onSendToFront: PropTypes.func.isRequired,
    onSwitchToBitmap: PropTypes.func.isRequired,
    onSwitchToVector: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    onUngroup: PropTypes.func.isRequired,
    onUpdateImage: PropTypes.func.isRequired,
    onUpdateName: PropTypes.func.isRequired,
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired,
    onZoomReset: PropTypes.func.isRequired,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number,
    setCanvas: PropTypes.func.isRequired,
    setTextArea: PropTypes.func.isRequired,
    textArea: PropTypes.instanceOf(Element)
};

export default injectIntl(PaintEditorComponent);

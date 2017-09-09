/** @flow */
import React, { Component } from 'react'
import { AutoSizer, Grid, ScrollSync } from 'react-virtualized'
import shallowCompare from 'react-addons-shallow-compare'
import scrollbarSize from 'dom-helpers/util/scrollbarSize'
// import cn from 'classnames'

// Own shit

import Players from './Players.js';
import PlayerLink from './PlayerLink.react.js';
import Ranking from './Test.js';

const ranking = new Ranking();
const players = ranking.getPlayers();

export default class Test extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      rowCount: players.length,
      columnCount: 9, // FIXME
      rowHeight: 40,
      columnWidth: 200,
      height: 600,
      overscanColumnCount: 0,
      overscanRowCount: 5
    }

    this._renderBodyCell = this._renderBodyCell.bind(this)
    this._renderHeaderCell = this._renderHeaderCell.bind(this)
    this._renderLeftSideCell = this._renderLeftSideCell.bind(this)
    this._getColumnWidth = this._getColumnWidth.bind(this)
  }

  render () {
    const {
      columnCount,
      columnWidth,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount
    } = this.state

    return (
      // <div {...this.props}>
      <div className="VirtualScroll">
        <ScrollSync>
          {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
            return (
              <div className="{styles.GridRow}">
                <div
                  // className={styles.LeftSideGridContainer}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: 1
                  }}
                >
                  <Grid
                    cellRenderer={this._renderLeftHeaderCell}
                    // className={styles.HeaderGrid}
                    width={columnWidth * 2}
                    height={rowHeight}
                    rowHeight={rowHeight}
                    columnWidth={this._getColumnWidth}
                    rowCount={1}
                    columnCount={2}
                  />
                </div>
                <div
                  // className={styles.LeftSideGridContainer}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: rowHeight,
                    zIndex: 1
                  }}
                >
                  <Grid
                    overscanColumnCount={overscanColumnCount}
                    overscanRowCount={overscanRowCount}
                    cellRenderer={this._renderLeftSideCell}
                    columnWidth={this._getColumnWidth}
                    columnCount={2}
                    // className={styles.LeftSideGrid}
                    height={height - scrollbarSize()}
                    rowHeight={rowHeight}
                    rowCount={rowCount}
                    scrollTop={scrollTop}
                    width={300} // FIXME
                    className="Grid--synchronized"
                  />
                </div>
                <div className="{styles.GridColumn}">
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <div>
                        <div style={{
                          height: rowHeight,
                          width: width - scrollbarSize()
                        }}>
                          <Grid
                            // className={styles.HeaderGrid}
                            columnWidth={this._getColumnWidth}
                            columnCount={columnCount}
                            height={rowHeight}
                            overscanColumnCount={overscanColumnCount}
                            cellRenderer={this._renderHeaderCell}
                            rowHeight={rowHeight}
                            rowCount={1}
                            scrollLeft={scrollLeft}
                            width={width - scrollbarSize()}
                            className="Grid--synchronized"
                          />
                        </div>
                        <div
                          style={{
                            height,
                            width
                          }}
                        >
                          <Grid
                            // className={styles.BodyGrid}
                            columnWidth={this._getColumnWidth}
                            columnCount={columnCount}
                            height={height}
                            onScroll={onScroll}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            cellRenderer={this._renderBodyCell}
                            rowHeight={rowHeight}
                            rowCount={rowCount}
                            width={width}
                          />
                        </div>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            )
          }}
        </ScrollSync>
      </div>
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  _getColumnWidth ({ index }) {
    const w = [
      50,
      250,
      150,
      150,
      150,
      150,
      150,
      150,
      150
    ]

    return w[index];
  }

  _renderBodyCell ({ columnIndex, rowIndex }) {
    if (columnIndex < 2) {
      return
    }

    return this._renderLeftSideCell({ columnIndex, rowIndex })
  }

  _renderHeaderCell ({ columnIndex, rowIndex }) {
    if (columnIndex < 2) {
      return
    }

    return (
      <div className="Table-head Table-cell">
        {ranking.getHeader(columnIndex)}
      </div>
    )
  }

  _renderLeftHeaderCell ({ columnIndex }) {
    return (
      <div className="Table-head Table-head--first Table-cell">
        {ranking.getHeader(columnIndex)}
      </div>
    )
  }

  _renderLeftSideCell ({ columnIndex, rowIndex }) {
    let cn = 'Table-cell';

    if (columnIndex === 0) {
      cn += ' Table-cell--first';
    } else if (columnIndex === 1) {
      cn += ' Table-content Table-content--second';
    } else {
      cn += ' Table-content';
    }

    // FIXME: Hard coded array reference!
    if (columnIndex === 1) {
      return (
        <div className={cn}>
          <PlayerLink player={Players.byID(ranking.getCell(columnIndex, rowIndex))} />
        </div>
      )
    } else {
      return (
        <div className={cn}>
          {ranking.getCell(columnIndex, rowIndex)}
        </div>
      )
    }
  }
}

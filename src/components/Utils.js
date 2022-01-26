const isMobile = (breakPoints) => {
    return (breakPoints.xs || (breakPoints.sm && !breakPoints.md))
}

export { isMobile };
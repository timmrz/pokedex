import React from 'react'
import ContentLoader from "react-content-loader"

type Props = {}

const Skeleton = ( props: Props ) => {
    return (
        <ContentLoader
            speed={3}
            width={320}
            height={398}
            viewBox="0 0 320 398"
            backgroundColor="#d8d8d4"
            foregroundColor="#c1c1c8"
            {...props}
        >
            <rect x="302" y="137" rx="0" ry="0" width="2" height="12" />
            <rect x="0" y="0" rx="7" ry="7" width="320" height="398" />
        </ContentLoader>
    )
}

export default Skeleton



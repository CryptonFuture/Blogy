document.addEventListener('DOMContentLoaded', function () {
    fetchGlobalEndPoints()
})

async function fetchGlobalEndPoints() {
    const res = await fetch(`${baseUrl}/getEndPoint`, {
        method: 'GET',
        headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
    })

    const data = await res.json()

    const epRouteGetPostNames = data.data[0].ePGetEndPointName[0]

    const epRouteGetTagNames = data.data[0].ePGetEndPointName[1]

    const epRouteGetPagesNames = data.data[0].ePGetEndPointName[2]

    const epRouteGetUserNames = data.data[0].ePGetEndPointName[3]


    document.dispatchEvent(new CustomEvent("endpointsReady", {detail: {
        post: epRouteGetPostNames,
        tag: epRouteGetTagNames,
        pages: epRouteGetPagesNames,
        user: epRouteGetUserNames
    }}))
}
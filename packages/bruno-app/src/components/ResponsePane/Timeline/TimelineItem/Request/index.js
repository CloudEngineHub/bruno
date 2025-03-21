import Headers from "../Common/Headers/index";
import BodyBlock from "../Common/Body/index";

const Request = ({ collection, request, item, width }) => {
  const { url, headers, data, dataBuffer, error } = request || {};  

  return (
    <div>
      {/* Method and URL */}
      <div className="mb-1 flex gap-2">
        <pre className="whitespace-pre-wrap">{url}</pre>
      </div>

      {/* Headers */}
      <Headers headers={headers} type={'request'} />

      {/* Body */}
      <BodyBlock collection={collection} data={data} dataBuffer={dataBuffer} error={error} headers={headers} item={item} width={width} />
  </div>
  )
}

export default Request;
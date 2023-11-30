export default function ReportFlow() {
  return (
    <div className="text-center justify-center items-center m-2">
      <div className="flex flex-row items-center justify-center ">
        {/* Langkah 1: User buat laporan */}

        <div className=" w-3/6 sm:w-2/6 md:w-1/6 lg:w-1/6  ">
          <div
            className="bg-blue-500 text-white p-4 rounded-md text-center mb-4 h-32"
            style={{ backgroundImage: 'url(https://placehold.co/200x200)' }}
          >
            <h3 className="text-lg font-semibold">User Buat Laporan</h3>
            <img src="" alt="" className="h-24" />
          </div>
          <div className="bg-white text-white h-16  rounded-md text-center mb-4  "></div>
          <div
            className="bg-blue-500 text-white p-4 rounded-md text-center mb-4 h-32"
            style={{ backgroundImage: 'url(https://placehold.co/200x200)' }}
          >
            <h3 className="text-lg font-semibold mb-2">
              Petugas menindaklanjuri laporan
            </h3>
            <img src="" alt="" className="h-24" />
          </div>
          <div className="bg-white text-white rounded-md text-center mb-4 "></div>
        </div>

        <div className="relative flex flex-col m-2">
          <div className="absolute -left-1 top-0 h-3 w-3 bg-black rounded rounded-lg "></div>

          <div className="h-24 w-1 bg-gray-500"></div>
          <div className="h-10 w-1 bg-gray-500"></div>

          <div className="relative -left-1 h-3 w-3 bg-black rounded rounded-lg "></div>
          <div className="absolute -left-1 top-0 h-3 w-3 bg-black rounded rounded-lg "></div>

          <div className="h-24 w-1 bg-gray-500"></div>
          <div className="h-10 w-1 bg-gray-500"></div>

          <div className="absolute -left-1 bottom-0 h-3 w-3 bg-black rounded rounded-lg "></div>
        </div>

        <div className="md:w-1/6 lg:w-1/6 sm:w-2/6 w-3/6 ">
          <div className="bg-white text-white h-32  rounded-md text-center mb-4  "></div>

          <div
            className="bg-blue-500 text-white p-4 rounded-md text-center mb-4 h-32"
            style={{
              backgroundImage: 'url(https://placehold.co/200x200)',
            }}
          >
            <h3 className="text-lg font-semibold mb-2">
              Admin menugaskan petugas
            </h3>
          </div>

          <div className="bg-white text-white h-32  rounded-md text-center mb-4  "></div>
        </div>
      </div>
    </div>
  );
}

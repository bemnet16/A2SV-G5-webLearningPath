import { AlertTriangle } from "lucide-react";

const ErrorComponent = ({ Errors }: any) => {
  const { status, data, error } = Errors;
  return (
    <div
      className="text-[#25324B] p-6 flex flex-col items-center justify-center text-[17px]"
      data-testid="error-component"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <AlertTriangle className="text-red-500 w-16 h-16" />
        <div className="bg-red-100 text-red-700 rounded-md p-4 min-w-96 text-center">
          {status === 500 ? (
            <div>
              <p>500: server error</p>
              <p className="error-component">{data.message}</p>
            </div>
          ) : (
            <div>
              <p>{status} </p>
              <p>{error}</p>
              <p>Check your connection</p>
            </div>
          )}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;

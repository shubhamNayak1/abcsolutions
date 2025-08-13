import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../../components/card/card';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './audit.css';
import SearchableTable from '../../../../components/table/searchableTable';
import { getAllAudit } from '../../../../api/audit';

const Audit: React.FC = () => {
  const [formData, setFormData] = useState({
    reportName: '',
    dateRange: [undefined, undefined] as [Date | undefined, Date | undefined],
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end && (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) > 31) {
      setError('The date range exceeds 31 days.');
      setFormData((prevState) => ({ ...prevState, dateRange: [start, end] }));
    } else {
      setError(null);
      setFormData((prevState) => ({
        ...prevState,
        dateRange: [start ?? undefined, end ?? undefined],
      }));
      if (start && end) {
        setIsCalendarOpen(false);
      }
    }
  };

  const handleRun = () => {
    console.log('Report Name:', formData.reportName);
    console.log(
      'Date Range:',
      formData.dateRange.map((date) => date?.toLocaleDateString()),
    );
  };

  const isRunDisabled =
    !formData.reportName || !formData.dateRange[0] || !formData.dateRange[1] || !!error;

  const columns = [
    'activityId',
    'username',
    'location',
    'activityDate',
    'activityTime',
    'details',
    'oldData',
    'newData',
    'remark',
  ];
  const columnLabels = {
    activityId: 'Id',
    username: 'Username',
    location: 'Location',
    activityDate: 'Date',
    activityTime: 'Time',
    details: 'Path',
    oldData: 'Old Data',
    newData: 'New Data',
    remark: 'Activity',
  };
  const [dataTable, setDataTable] = useState<Record<string, any>[]>([]);

  const loadAudit = useCallback(async () => {
    try {
      const { data } = await getAllAudit();
      setDataTable(data);
    } catch {
      console.log('error');
    }
  }, []);

  useEffect(() => {
    loadAudit();
  }, []);

  return (
    <>
      <div className="audit">
        <div className="header-band">Audit</div>
        <Card>
          <div className="form-container">
            <form className="user-form">
              <div className="form-field">
                <label htmlFor="reportName">Report Name</label>
                <input
                  type="text"
                  name="reportName"
                  id="reportName"
                  value={formData.reportName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="dateRange">Date</label>
                <input
                  type="text"
                  name="dateRange"
                  id="dateRange"
                  value={
                    formData.dateRange[0] && formData.dateRange[1]
                      ? `${formData.dateRange[0].toLocaleDateString()} - ${formData.dateRange[1].toLocaleDateString()}`
                      : ''
                  }
                  readOnly
                  onClick={() => setIsCalendarOpen(true)}
                  required
                />
                {isCalendarOpen && (
                  <DatePicker
                    selected={formData.dateRange[0]}
                    onChange={handleDateChange}
                    startDate={formData.dateRange[0]}
                    endDate={formData.dateRange[1]}
                    selectsRange
                    inline
                  />
                )}
                {error && <div className="error-message">{error}</div>}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleRun}
                  className="run-button"
                  disabled={isRunDisabled}
                >
                  Run
                </button>
              </div>
            </form>
          </div>
        </Card>
        <Card>
          <SearchableTable columnLabels={columnLabels} columns={columns} data={dataTable} />
        </Card>
      </div>
    </>
  );
};

export default Audit;

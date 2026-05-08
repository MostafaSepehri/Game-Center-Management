/**
 * DataTables Advanced (jquery) - RTL Fixed
 */

'use strict';
console.log('DT FILE LOADED ✅');

$(function () {

  var dt_ajax_table = $('.datatables-ajax'),
      dt_filter_table = $('.dt-column-search'),
      dt_adv_filter_table = $('.dt-advanced-search'),
      dt_responsive_table = $('.dt-responsive'),
      startDateEle = $('.start_date'),
      endDateEle = $('.end_date');

  var rangePickr = $('.flatpickr-range'),
      dateFormat = 'MM/DD/YYYY';

  if (rangePickr.length) {
    rangePickr.flatpickr({
      mode: 'range',
      dateFormat: 'm/d/Y',
      orientation: isRtl ? 'auto right' : 'auto left',
      locale: { format: dateFormat }
    });
  }

  var faLang = {
    search: "جستجو:",
    lengthMenu: "نمایش _MENU_ رکورد",
    info: "نمایش _START_ تا _END_ از _TOTAL_ رکورد",
    zeroRecords: "رکوردی یافت نشد",
    processing: "در حال پردازش...",
    paginate: {
      previous: "قبلی",
      next: "بعدی"
    }
  };

  var rtlDom =
    '<"row"' +
      '<"col-sm-12 col-md-6 d-flex justify-content-end"f>' +
      '<"col-sm-12 col-md-6 d-flex justify-content-start"l>' +
    '>' +
    '<"table-responsive"t>' +
    '<"row"' +
      '<"col-sm-12 col-md-6"i>' +
      '<"col-sm-12 col-md-6"p>' +
    '>';

  // AJAX TABLE
  if (dt_ajax_table.length) {
    dt_ajax_table.DataTable({
      processing: true,
      ajax: assetsPath + 'json/ajax.php',
      language: faLang,
      dom: rtlDom
    });
  }

  // COLUMN SEARCH
  if (dt_filter_table.length) {

    $('.dt-column-search thead tr').clone(true).appendTo('.dt-column-search thead');

    $('.dt-column-search thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();

      $(this).html('<input type="text" class="form-control" placeholder="جستجو ' + title + '" />');

      $('input', this).on('keyup change', function () {
        if (dt_filter.column(i).search() !== this.value) {
          dt_filter.column(i).search(this.value).draw();
        }
      });
    });

    var dt_filter = dt_filter_table.DataTable({
      ajax: assetsPath + 'json/table-datatable.json',
      language: faLang,
      orderCellsTop: true,
      dom: rtlDom,
      columns: [
        { data: 'full_name' },
        { data: 'email' },
        { data: 'post' },
        { data: 'city' },
        { data: 'start_date' },
        { data: 'salary' }
      ]
    });
  }

  // ADVANCED SEARCH
  if (dt_adv_filter_table.length) {
    dt_adv_filter_table.DataTable({
      ajax: assetsPath + 'json/table-datatable.json',
      language: faLang,
      dom:
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-6'i>" +
        "<'col-sm-12 col-md-6 dataTables_pager'p>>",
      columns: [
        { data: '' },
        { data: 'full_name' },
        { data: 'email' },
        { data: 'post' },
        { data: 'city' },
        { data: 'start_date' },
        { data: 'salary' }
      ],
      columnDefs: [
        {
          className: 'control',
          orderable: false,
          targets: 0,
          render: function () {
            return '';
          }
        }
      ]
    });
  }

  // RESPONSIVE TABLE
  if (dt_responsive_table.length) {
    dt_responsive_table.DataTable({
      ajax: assetsPath + 'json/table-datatable.json',
      language: faLang,
      destroy: true,
      dom: rtlDom,
      columns: [
        { data: '' },
        { data: 'full_name' },
        { data: 'email' },
        { data: 'post' },
        { data: 'city' },
        { data: 'start_date' },
        { data: 'salary' },
        { data: 'age' },
        { data: 'experience' },
        { data: 'status' }
      ],
      columnDefs: [
        {
          className: 'control',
          orderable: false,
          targets: 0,
          searchable: false,
          render: function () {
            return '';
          }
        },
        {
          targets: -1,
          render: function (data, type, full) {

            var status = {
              1: { title: 'فعال', class: 'bg-label-primary' },
              2: { title: 'حرفه‌ای', class: 'bg-label-success' },
              3: { title: 'رد شده', class: 'bg-label-danger' },
              4: { title: 'استعفا', class: 'bg-label-warning' },
              5: { title: 'درخواست', class: 'bg-label-info' }
            };

            if (typeof status[full.status] === 'undefined') {
              return data;
            }

            return '<span class="badge rounded-pill ' +
              status[full.status].class +
              '">' +
              status[full.status].title +
              '</span>';
          }
        }
      ]
    });
  }

});

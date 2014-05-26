if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.fontcolor = {
	init: function()
	{
		var colors = [
            '#000000', '#000033', '#000066', '#000099', '#0000CC', '#0000FF', '#003300', '#003333', '#003366',
            '#003399', '#0033CC', '#0033FF', '#006600', '#006633', '#006666', '#006699', '#0066CC', '#0066FF',
            '#009900', '#009933', '#009966', '#009999', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66',
            '#00CC99', '#00CCCC', '#00CCFF', '#00FF00', '#00FF33', '#00FF66', '#00FF99', '#00FFCC', '#00FFFF',
            '#330000', '#330033', '#330066', '#330099', '#3300CC', '#3300FF', '#333300', '#333333', '#333366',
            '#333399', '#3333CC', '#3333FF', '#336600', '#336633', '#336666', '#336699', '#3366CC', '#3366FF',
            '#339900', '#339933', '#339966', '#339999', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66',
            '#33CC99', '#33CCCC', '#33CCFF', '#33FF00', '#33FF33', '#33FF66', '#33FF99', '#33FFCC', '#33FFFF',
            '#660000', '#660033', '#660066', '#660099', '#6600CC', '#6600FF', '#663300', '#663333', '#663366',
            '#663399', '#6633CC', '#6633FF', '#666600', '#666633', '#666666', '#666699', '#6666CC', '#6666FF',
            '#669900', '#669933', '#669966', '#669999', '#6699CC', '#6699FF', '#66CC00', '#66CC33', '#66CC66',
            '#66CC99', '#66CCCC', '#66CCFF', '#66FF00', '#66FF33', '#66FF66', '#66FF99', '#66FFCC', '#66FFFF',
            '#990000', '#990033', '#990066', '#990099', '#9900CC', '#9900FF', '#993300', '#993333', '#993366',
            '#993399', '#9933CC', '#9933FF', '#996600', '#996633', '#996666', '#996699', '#9966CC', '#9966FF',
            '#999900', '#999933', '#999966', '#999999', '#9999CC', '#9999FF', '#99CC00', '#99CC33', '#99CC66',
            '#99CC99', '#99CCCC', '#99CCFF', '#99FF00', '#99FF33', '#99FF66', '#99FF99', '#99FFCC', '#99FFFF',
            '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
            '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC6666', '#CC6699', '#CC66CC', '#CC66FF',
            '#CC9900', '#CC9933', '#CC9966', '#CC9999', '#CC99CC', '#CC99FF', '#CCCC00', '#CCCC33', '#CCCC66',
            '#CCCC99', '#CCCCCC', '#CCCCFF', '#CCFF00', '#CCFF33', '#CCFF66', '#CCFF99', '#CCFFCC', '#CCFFFF',
            '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366',
            '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF6666', '#FF6699', '#FF66CC', '#FF66FF', 
            '#FF9900', '#FF9933', '#FF9966', '#FF9999', '#FF99CC', '#FF99FF', '#FFCC00', '#FFCC33', '#FFCC66',
            '#FFCC99', '#FFCCCC', '#FFCCFF', '#FFFF00', '#FFFF33', '#FFFF66', '#FFFF99', '#FFFFCC'
		];

        var buttons = ['fontcolor', 'backcolor'];

        this.buttonAddSeparator();

        for (var i = 0; i < 2; i++)
        {
            var name = buttons[i];

            var $dropdown = $('<div class="redactor_dropdown redactor_dropdown_box_' + name + '" style="display: none; width: 410px;">');

            this.pickerBuild($dropdown, name, colors);
            $(this.$toolbar).append($dropdown);

            this.buttonAdd(name, this.opts.curLang[name], $.proxy(function(btnName, $button, btnObject, e)
        {
            this.dropdownShow(e, btnName);

        }, this));
        }
    },
	pickerBuild: function($dropdown, name, colors)
	{
		var rule = 'color';
		if (name === 'backcolor') rule = 'background-color';

		var _self = this;
		var onSwatch = function(e)
		{
			e.preventDefault();

			var $this = $(this);
			_self.pickerSet($this.data('rule'), $this.attr('rel'));

		}

		var len = colors.length;
		for (var z = 0; z < len; z++)
		{
			var color = colors[z];

			var $swatch = $('<a rel="' + color + '" data-rule="' + rule +'" href="#" style="float: left; font-size: 0; border: 2px solid #fff; padding: 0; margin: 0; width: 20px; height: 20px;"></a>');
			$swatch.css('background-color', color);
			$dropdown.append($swatch);
			$swatch.on('click', onSwatch);
		}

		var $elNone = $('<a href="#" style="display: block; clear: both; padding: 4px 0; font-size: 11px; line-height: 1;"></a>')
		.html(this.opts.curLang.none)
		.on('click', function(e)
		{
			e.preventDefault();
			_self.pickerSet(rule, false);
		});

		$dropdown.append($elNone);
	},
	pickerSet: function(rule, type)
	{
		this.bufferSet();

		this.$editor.focus();
		this.inlineRemoveStyle(rule);
		if (type !== false) this.inlineSetStyle(rule, type);
		if (this.opts.air) this.$air.fadeOut(100);
		this.sync();
	}
};

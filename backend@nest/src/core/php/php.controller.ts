import { Controller, Get, Post, Query, Body, Param } from '@nestjs/common';
import { PhpService } from './php.service';

@Controller('')
export class PhpController {
    constructor(private readonly phpService: PhpService) { }

    // GET
    @Get(':scriptName')
    async runPhpByGet(
        @Param('scriptName') scriptName: string,
        @Query() query: any,
    ) {
        return this.phpService.runScript(scriptName, query);
    }

    // POST
    @Post(':scriptName')
    async runPhpByPost(
        @Param('scriptName') scriptName: string,
        @Body() body: any,
    ) {
        return this.phpService.runScript(scriptName, body);
    }
}